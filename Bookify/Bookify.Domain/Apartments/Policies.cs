namespace Bookify.Domain.Apartments
{
    public record Policies(
    string CheckIn,
    string CheckOut,
    int MinStay,
    string Cancellation);
}
