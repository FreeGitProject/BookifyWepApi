using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Application.Apartments.SearchApartments;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using Dapper;

namespace Bookify.Application.Apartments.GetApartment
{
    internal sealed class GetApartmentByIdQueryHandler
        : IQueryHandler<GetApartmentByIdQuery, ApartmentDetailResponse>
    {
        private readonly ISqlConnectionFactory _sqlConnectionFactory;

        public GetApartmentByIdQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

        public async Task<Result<ApartmentDetailResponse>> Handle(
            GetApartmentByIdQuery request,
            CancellationToken cancellationToken)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();

            const string sql = """
                SELECT
                    a.id AS Id,
                    a.name AS Name,
                    a.description AS Description,
                    a.price_amount AS PriceAmount,
                    a.price_currency AS PriceCurrency,
                    a.cleaning_fee_amount AS CleaningFeeAmount,
                    a.cleaning_fee_currency AS CleaningFeeCurrency,
                    a.address_country AS Country,
                    a.address_state AS State,
                    a.address_zip_code AS ZipCode,
                    a.address_city AS City,
                    a.address_street AS Street,
                    ai.url AS ImageUrl  -- This must match the splitOn parameter
                FROM apartments a
                LEFT JOIN apartment_images ai ON ai.apartment_id = a.id
                WHERE a.id = @ApartmentId
                """;

            var apartmentDictionary = new Dictionary<Guid, ApartmentDetailResponse>();

            var apartments = await connection.QueryAsync<
                ApartmentDetailResponse,
                AddressResponse,
                string,
                ApartmentDetailResponse>(
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

                    if (!string.IsNullOrWhiteSpace(imageUrl))
                    {
                        apartmentEntry.ImageUrls.Add(imageUrl);
                    }

                    return apartmentEntry;
                },
                new { request.ApartmentId },
                splitOn: "Country,ImageUrl");  // Must match the column aliases in SQL

            if (!apartmentDictionary.TryGetValue(request.ApartmentId, out var result))
            {
                return Result.Failure<ApartmentDetailResponse>(ApartmentErrors.NotFound);
            }

            return result;
        }
    }
}