using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Bookings;
using Dapper;
using System.Text;

namespace Bookify.Application.Apartments.SearchApartments
{
    internal sealed class SearchApartmentsQueryHandler
        : IQueryHandler<SearchApartmentsQuery, PagedList<ApartmentResponse>>
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

        public async Task<Result<PagedList<ApartmentResponse>>> Handle(
            SearchApartmentsQuery request,
            CancellationToken cancellationToken)
        {
            if (request.StartDate > request.EndDate)
            {
                return new PagedList<ApartmentResponse>(new List<ApartmentResponse>(), 1, 10, 0);
            }

            using var connection = _sqlConnectionFactory.CreateConnection();

            var sqlBuilder = new StringBuilder();
            var parameters = new DynamicParameters();

            // Base query
            sqlBuilder.Append("""
                SELECT
                    a.id AS Id,
                    a.name AS Name,
                    a.description AS Description,
                    a.price_amount AS Price,
                    a.price_currency AS Currency,
                    a.bedrooms AS Bedrooms,
                    a.bathrooms AS Bathrooms,
                    a.size AS Size,
                    a.type AS Type,
                    a.amenities AS Amenities,
                    a.address_country AS Country,
                    a.address_state AS State,
                    a.address_zip_code AS ZipCode,
                    a.address_city AS City,
                    a.address_street AS Street,
                    ai.url AS ImageUrl,
                    COALESCE(AVG(r.rating), 0) AS Rating,
                    COUNT(r.id) AS ReviewCount
                FROM apartments AS a
                LEFT JOIN apartment_images AS ai ON ai.apartment_id = a.id
                LEFT JOIN reviews AS r ON r.apartment_id = a.id
                """);

            // Availability filter
            if (request.StartDate.HasValue && request.EndDate.HasValue)
            {
                sqlBuilder.Append("""
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM bookings AS b
                        WHERE
                            b.apartment_id = a.id AND
                            b.duration_start <= @EndDate AND
                            b.duration_end >= @StartDate AND
                            b.status = ANY(@ActiveBookingStatuses)
                    """);
                parameters.Add("StartDate", request.StartDate);
                parameters.Add("EndDate", request.EndDate);
                parameters.Add("ActiveBookingStatuses", ActiveBookingStatuses);
            }
            else
            {
                sqlBuilder.Append("WHERE 1=1");
            }

            // Additional filters
            if (!string.IsNullOrWhiteSpace(request.Country))
            {
                sqlBuilder.Append(" AND a.address_country ILIKE @Country");
                parameters.Add("Country", $"%{request.Country}%");
            }

            if (!string.IsNullOrWhiteSpace(request.Name))
            {
                sqlBuilder.Append(" AND a.name ILIKE @Name");
                parameters.Add("Name", $"%{request.Name}%");
            }

            if (request.MinPrice.HasValue)
            {
                sqlBuilder.Append(" AND a.price_amount >= @MinPrice");
                parameters.Add("MinPrice", request.MinPrice);
            }

            if (request.MaxPrice.HasValue)
            {
                sqlBuilder.Append(" AND a.price_amount <= @MaxPrice");
                parameters.Add("MaxPrice", request.MaxPrice);
            }

            if (request.Bedrooms.HasValue)
            {
                sqlBuilder.Append(" AND a.bedrooms = @Bedrooms");
                parameters.Add("Bedrooms", request.Bedrooms);
            }

            if (request.Bathrooms.HasValue)
            {
                sqlBuilder.Append(" AND a.bathrooms = @Bathrooms");
                parameters.Add("Bathrooms", request.Bathrooms);
            }

            if (request.Type.HasValue)
            {
                sqlBuilder.Append(" AND a.type = @Type");
                parameters.Add("Type", request.Type);
            }

            if (request.Amenities?.Any() == true)
            {
                sqlBuilder.Append(" AND a.amenities @> @Amenities");
                parameters.Add("Amenities", request.Amenities.Select(a => (int)a).ToArray());
            }

            // Group by for aggregations
            sqlBuilder.Append(" GROUP BY a.id, ai.url");

            // Sorting
            sqlBuilder.Append(" ORDER BY ");
            sqlBuilder.Append(request.SortBy switch
            {
                "price_asc" => "a.price_amount ASC",
                "price_desc" => "a.price_amount DESC",
                "rating" => "Rating DESC",
                "reviews" => "ReviewCount DESC",
                _ => "(COALESCE(AVG(r.rating), 0) * 0.7 + COUNT(r.id) * 0.3 DESC" // Recommended
            });

            // Pagination
            sqlBuilder.Append(" LIMIT @PageSize OFFSET @Offset");
            parameters.Add("PageSize", request.PageSize);
            parameters.Add("Offset", (request.Page - 1) * request.PageSize);

            // Count query for pagination
            var countSql = new StringBuilder("SELECT COUNT(*) FROM apartments a");
            if (request.StartDate.HasValue && request.EndDate.HasValue)
            {
                countSql.Append("""
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM bookings AS b
                        WHERE
                            b.apartment_id = a.id AND
                            b.duration_start <= @EndDate AND
                            b.duration_end >= @StartDate AND
                            b.status = ANY(@ActiveBookingStatuses))
                    """);
            }

            var totalCount = await connection.ExecuteScalarAsync<int>(countSql.ToString(), parameters);

            // Execute main query
            var apartmentDictionary = new Dictionary<Guid, ApartmentResponse>();
            var apartments = await connection.QueryAsync<ApartmentResponse, AddressResponse, string, ApartmentResponse>(
                sqlBuilder.ToString(),
                (apartment, address, imageUrl) =>
                {
                    if (!apartmentDictionary.TryGetValue(apartment.Id, out var apartmentEntry))
                    {
                        apartmentEntry = apartment;
                        apartmentEntry.Address = address;
                        apartmentEntry.ImageUrls = new List<string>();
                        apartmentDictionary.Add(apartmentEntry.Id, apartmentEntry);
                    }

                    if (!string.IsNullOrWhiteSpace(imageUrl))
                    {
                        apartmentEntry.ImageUrls.Add(imageUrl);
                    }

                    return apartmentEntry;
                },
                parameters,
                splitOn: "Country,ImageUrl");

            return new PagedList<ApartmentResponse>(
                apartmentDictionary.Values.ToList(),
                request.Page,
                request.PageSize,
                totalCount);
        }
    }
}