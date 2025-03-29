using Bookify.Application.Abstractions.Caching;

namespace Bookify.Application.Bookings.GetAllBooking;

public sealed record GetBookingAllQuery(Guid UserId) : ICachedQuery<IReadOnlyList<BookingListResponse>>
{
    public string CacheKey => $"GetBookingAllQuery_{UserId}";
    public TimeSpan? Expiration => null;
}
