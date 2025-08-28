using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Application.Apartments.SearchApartments;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookify.Application.Apartments.GetApartment;

internal sealed class GetAparmentQueryHandler
    : IQueryHandler<GetAparmentQuery, ApartmentDetailResponse>
{
    private readonly ISqlConnectionFactory _sqlConnectionFactory;

    public GetAparmentQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
    {
        _sqlConnectionFactory = sqlConnectionFactory;
    }

    public async Task<Result<ApartmentDetailResponse>> Handle(
        GetAparmentQuery request,
        CancellationToken cancellationToken)
    {
        using var connection = _sqlConnectionFactory.CreateConnection();

        // NOTE: column names assume snake_case naming convention for EF owned types.
        const string sql = """
-- base apartment row (owned Address, Host, Policies flattened on apartments)
SELECT
    a.id                              AS Id,
    a.name                            AS Name,
    a.description                     AS Description,
    a.price_amount                    AS Price,
    a.original_price_amount           AS OriginalPrice,
    a.rating                          AS Rating,
    a.reviews                         AS Reviews,
    a.bedrooms                        AS Bedrooms,
    a.bathrooms                       AS Bathrooms,
    a.area                            AS Area,
    a.max_guests                      AS MaxGuests,
    a.property_type                   AS PropertyType,
    a.address_country                 AS Country,
    a.address_state                   AS State,
    a.address_zip_code                AS ZipCode,
    a.address_city                    AS City,
    a.address_street                  AS Street,
    a.host_name                       AS HostName,
    a.host_avatar_url                 AS HostAvatarUrl,
    a.host_rating                     AS HostRating,
    a.host_reviews                    AS HostReviews,
    a.host_verified                   AS HostVerified,
    a.host_response_time              AS HostResponseTime,
    a.policies_check_in               AS PoliciesCheckIn,
    a.policies_check_out              AS PoliciesCheckOut,
    a.policies_min_stay               AS PoliciesMinStay,
    a.policies_cancellation           AS PoliciesCancellation
FROM apartments a
WHERE a.id = @ApartmentId;

-- images (owned-many table)
SELECT url
FROM apartment_images
WHERE apartment_id = @ApartmentId;

-- amenities (owned-many table)
SELECT type   AS Type,
       included AS Included
FROM apartment_amenities
WHERE apartment_id = @ApartmentId;

-- nearby places (owned-many table)
SELECT name     AS Name,
       distance AS Distance,
       type     AS Type
FROM apartment_nearby_places
WHERE apartment_id = @ApartmentId;
""";

        using var multi = await connection.QueryMultipleAsync(sql, new { ApartmentId = request.AparmentId });

        var baseRow = await multi.ReadFirstOrDefaultAsync<ApartmentBaseRaw>();
        if (baseRow is null)
        {
            return Result.Failure<ApartmentDetailResponse>(ApartmentErrors.NotFound);
        }

        var images = (await multi.ReadAsync<string>()).ToList();
        var amenityRows = (await multi.ReadAsync<AmenityRaw>()).ToList();
        var nearby = (await multi.ReadAsync<NearbyPlaceResponse>()).ToList();

        var response = new ApartmentDetailResponse
        {
            Id = baseRow.Id,
            Name = baseRow.Name,
            Description = baseRow.Description,
            Price = baseRow.Price,
            OriginalPrice = baseRow.OriginalPrice,
            Rating = baseRow.Rating,
            Reviews = baseRow.Reviews,
            Bedrooms = baseRow.Bedrooms,
            Bathrooms = baseRow.Bathrooms,
            Area = baseRow.Area,
            MaxGuests = baseRow.MaxGuests,
            PropertyType = MapPropertyType(baseRow.PropertyType),
            Address = new AddressResponse
            {
                Country = baseRow.Country,
                State = baseRow.State,
                ZipCode = baseRow.ZipCode,
                City = baseRow.City,
                Street = baseRow.Street
            },
            Images = images,
            Amenities = amenityRows.Select(MapAmenity).ToList(),
            Host = new HostResponse
            {
                Name = baseRow.HostName,
                Avatar = baseRow.HostAvatarUrl,
                Rating = baseRow.HostRating,
                Reviews = baseRow.HostReviews,
                Verified = baseRow.HostVerified,
                ResponseTime = baseRow.HostResponseTime
            },
            NearbyPlaces = nearby,
            Policies = new PoliciesResponse
            {
                CheckIn = baseRow.PoliciesCheckIn,
                CheckOut = baseRow.PoliciesCheckOut,
                MinStay = baseRow.PoliciesMinStay,
                Cancellation = baseRow.PoliciesCancellation
            }
        };

        return response;
    }

    private static string MapPropertyType(int raw) =>
        Enum.IsDefined(typeof(PropertyType), raw)
            ? ((PropertyType)raw).ToString().ToLowerInvariant()
            : "unknown";

    private static AmenityResponse MapAmenity(AmenityRaw raw)
    {
        var name = "Unknown";
        var icon = "Help";

        if (Enum.IsDefined(typeof(AmenityType), raw.Type))
        {
            var t = (AmenityType)raw.Type;
            (name, icon) = t switch
            {
                AmenityType.WiFi => ("High-Speed WiFi", "Wifi"),
                AmenityType.SwimmingPool => ("Swimming Pool", "Waves"),
                AmenityType.Gym => ("Fitness Center", "Dumbbell"),
                AmenityType.Parking => ("Parking", "Car"),
                AmenityType.AirConditioning => ("Air Conditioning", "Wind"),
                AmenityType.PetFriendly => ("Pet Friendly", "Paw"),
                AmenityType.Spa => ("Spa", "Sparkles"),
                AmenityType.Terrace => ("Terrace", "Sun"),
                AmenityType.MountainView => ("Mountain View", "Mountain"),
                AmenityType.GardenView => ("Garden View", "Leaf"),
                _ => ("Unknown", "Help")
            };
        }

        return new AmenityResponse
        {
            Name = name,
            Icon = icon,
            Included = raw.Included
        };
    }

    // raw row shapes for Dapper
    private sealed class ApartmentBaseRaw
    {
        public Guid Id { get; init; }
        public string Name { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public decimal Price { get; init; }
        public decimal OriginalPrice { get; init; }
        public decimal Rating { get; init; }
        public int Reviews { get; init; }
        public int Bedrooms { get; init; }
        public int Bathrooms { get; init; }
        public int Area { get; init; }
        public int MaxGuests { get; init; }
        public int PropertyType { get; init; }
        public string Country { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public string ZipCode { get; init; } = string.Empty;
        public string City { get; init; } = string.Empty;
        public string Street { get; init; } = string.Empty;

        // Host (owned one on apartments)
        public string HostName { get; init; } = string.Empty;
        public string HostAvatarUrl { get; init; } = string.Empty;
        public decimal HostRating { get; init; }
        public int HostReviews { get; init; }
        public bool HostVerified { get; init; }
        public string HostResponseTime { get; init; } = string.Empty;

        // Policies (owned one on apartments)
        public string PoliciesCheckIn { get; init; } = string.Empty;
        public string PoliciesCheckOut { get; init; } = string.Empty;
        public int PoliciesMinStay { get; init; }
        public string PoliciesCancellation { get; init; } = string.Empty;
    }

    private sealed class AmenityRaw
    {
        public int Type { get; init; }
        public bool Included { get; init; }
    }
}