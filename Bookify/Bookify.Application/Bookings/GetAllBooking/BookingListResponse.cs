namespace Bookify.Application.Bookings.GetAllBooking
{
    public sealed class BookingListResponse
    {
        public Guid BookingId { get; init; }
        public Guid ApartmentId { get; init; }
        public Guid UserId { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public int Status { get; init; }
    }
}
