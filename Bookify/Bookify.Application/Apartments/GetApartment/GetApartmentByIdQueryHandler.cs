using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Application.Apartments.SearchApartments;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using Dapper;


namespace Bookify.Application.Apartments.GetApartment
{
    internal sealed class GetApartmentByIdQueryHandler : IQueryHandler<GetApartmentByIdQuery, ApartmentDetailResponse>
    {
        private readonly ISqlConnectionFactory _sqlConnectionFactory;

        public GetApartmentByIdQueryHandler(ISqlConnectionFactory sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }
        
        public async Task<Result<ApartmentDetailResponse>> Handle(GetApartmentByIdQuery request, CancellationToken cancellationToken)
        {
            using var connection = _sqlConnectionFactory.CreateConnection();

            const string sql = """
            SELECT
                a.id AS Id,
                a.name AS Name,
                a.description AS Description,
                a.price_amount AS PriceAmount,
                a.price_currency AS PriceCurrency,
                a.address_country AS Country,
                a.address_state AS State,
                a.address_zip_code AS ZipCode,
                a.address_city AS City,
                a.address_street AS Street
            FROM apartments a
            WHERE a.id = @ApartmentId
            """;

            var apartment = await connection.QueryAsync<ApartmentDetailResponse, AddressResponse, ApartmentDetailResponse>(
                sql,
                (apartment, address) => {
                    apartment.Address = address;
                    return apartment;
                },
                new { request.ApartmentId },
                splitOn: "Country");

            if (apartment is null)
            {
                return Result.Failure<ApartmentDetailResponse>(ApartmentErrors.NotFound);
            }

            return apartment.FirstOrDefault();
        }
    }
}
