using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
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
                a.description AS Description,
                a.price_amount AS Price,
                a.price_currency AS Currency,
                a.address_country AS Country,
                a.address_state AS State,
                a.address_zip_code AS ZipCode,
                a.address_city AS City,
                a.address_street AS Street,
                ai.url AS ImageUrl
            FROM apartments AS a
            LEFT JOIN apartment_images AS ai ON ai.apartment_id = a.id
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
            """;
        var apartmentDictionary = new Dictionary<Guid, ApartmentResponse>();

        var apartments = await connection.QueryAsync<ApartmentResponse, AddressResponse, string, ApartmentResponse>(
                sql,
                (apartment, address, imageUrl) =>
                {
                    if (!apartmentDictionary.TryGetValue(apartment.Id, out var apartmentEntry))
                    {
                        apartmentEntry = apartment;
                        apartmentEntry.Address = address;
                        apartmentEntry.ImageUrls = new List<string>();
                        apartmentDictionary.Add(apartmentEntry.Id, apartmentEntry);
                    }

                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        apartmentEntry.ImageUrls.Add(imageUrl);
                    }

                    return apartmentEntry;
                },
                new
                {
                    request.StartDate,
                    request.EndDate,
                    ActiveBookingStatuses
                },
                splitOn: "Country,ImageUrl");

        return apartmentDictionary.Values.ToList();
    }
}