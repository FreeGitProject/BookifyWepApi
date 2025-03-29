using Bookify.Application.Abstractions.Authentication;
using Bookify.Application.Abstractions.Data;
using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Dapper;

namespace Bookify.Application.Bookings.GetAllBooking;

internal sealed class GetBookingAllQueryHandler : IQueryHandler<GetBookingAllQuery, IReadOnlyList<BookingListResponse>>
{
    private readonly ISqlConnectionFactory _sqlConnectionFactory;
    private readonly IUserContext _userContext;

    public GetBookingAllQueryHandler(ISqlConnectionFactory sqlConnectionFactory, IUserContext userContext)
    {
        _sqlConnectionFactory = sqlConnectionFactory;
        _userContext = userContext;
    }

    public async Task<Result<IReadOnlyList<BookingListResponse>>> Handle(
        GetBookingAllQuery request,
        CancellationToken cancellationToken)
    {
        using var connection = _sqlConnectionFactory.CreateConnection();

        const string sql = """
            SELECT
                id AS BookingId,
                apartment_id AS ApartmentId,
                user_id AS UserId,
                status AS Status,
                duration_start AS StartDate,
                duration_end AS EndDate
            FROM bookings
            WHERE user_id = @UserId
            """;

        var bookings = await connection.QueryAsync<BookingListResponse>(
            sql,
            new { UserId = _userContext.UserId });

        return Result.Success<IReadOnlyList<BookingListResponse>>(bookings.ToList());
        //return bookings.ToList();
    }
}
