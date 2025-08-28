using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using Bookify.Domain.Bookings;
using Dapper;

namespace Bookify.Application.Apartments.SearchApartments;

internal sealed class SearchApartmentsQueryHandler
    : IQueryHandler<SearchApartmentsQuery, IReadOnlyList<ApartmentResponse>>
{
    private static readonly int[] ActiveBookingStatuses =
    {
        (int)BookingStatus.Reserved,
        (int)BookingStatus.Confirmed,
        (int)BookingStatus.Completed
    };

    private readonly ISqlConnectionFactory _sqlConnectionFactory;

    public SearchApartmentsQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
    {
        _sqlConnectionFactory = sqlConnectionFactory;
    }

    public async Task<Result<IReadOnlyList<ApartmentResponse>>> Handle(SearchApartmentsQuery request, CancellationToken cancellationToken)
    {
        if (request.StartDate > request.EndDate)
        {
            return new List<ApartmentResponse>();
        }

        using var connection = _sqlConnectionFactory.CreateConnection();

        const string sql = """
    SELECT
        a.id AS Id,
        a.name AS Name,
        a.price_amount AS Price,
        a.original_price_amount AS OriginalPrice,
        a.price_currency AS Currency,
        a.rating AS Rating,
        a.reviews AS Reviews,
        a.bedrooms AS Bedrooms,
        a.bathrooms AS Bathrooms,
        a.area AS Area,
        a.max_guests AS MaxGuests,
        a.featured AS Featured,
        a.property_type AS PropertyType,
        a.host_name AS Host,
        MIN(ai.url) AS Image,                               
        STRING_AGG(CAST(aa.type AS varchar), ',') AS Amenities,           
        a.address_country AS Country,
        a.address_state AS State,
        a.address_zip_code AS ZipCode,
        a.address_city AS City,
        a.address_street AS Street
    FROM apartments AS a
    LEFT JOIN apartment_images AS ai ON ai.apartment_id = a.id
    LEFT JOIN apartment_amenities AS aa ON aa.apartment_id = a.id
    WHERE NOT EXISTS
    (
        SELECT 1
        FROM bookings AS b
        WHERE
            b.apartment_id = a.id AND
            b.duration_start <= @EndDate AND
            b.duration_end >= @StartDate AND
            b.status = ANY(@ActiveBookingStatuses)
    )
    GROUP BY
        a.id,
        a.name,
        a.price_amount,
        a.original_price_amount,
        a.price_currency,
        a.rating,
        a.reviews,
        a.bedrooms,
        a.bathrooms,
        a.area,
        a.max_guests,
        a.featured,
        a.property_type,
        a.host_name,
        a.address_country,
        a.address_state,
        a.address_zip_code,
        a.address_city,
        a.address_street;
    
    """;


        var apartments = await connection
        .QueryAsync<ApartmentResponse, AddressResponse, ApartmentResponse>(
            sql,
            (apartment, address) =>
            {
                apartment.Address = address;

                // Split aggregated amenities
                if (apartment.Amenities is null && !string.IsNullOrEmpty(apartment.Image))
                {
                    apartment.Amenities = new List<string>();
                }

                return apartment;
            },
            new
            {
                request.StartDate,
                request.EndDate,
                ActiveBookingStatuses
            },
            splitOn: "Country");

        foreach (var apt in apartments)
        {
            if (!string.IsNullOrEmpty(apt.AmenitiesRaw))
            {
                apt.Amenities = apt.AmenitiesRaw
                    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                    .Select(id =>
                    {
                        if (int.TryParse(id, out var amenityId) &&
                            Enum.IsDefined(typeof(AmenityType), amenityId))
                        {
                            return Enum.GetName(typeof(AmenityType), amenityId)!;
                        }

                        return $"Unknown({id})";
                    })
                    .ToList();
            }
        }



        return apartments.ToList();
    }
}