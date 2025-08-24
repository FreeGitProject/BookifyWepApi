namespace Bookify.Domain.Apartments
{
    public record Host(
    string Name,
    string AvatarUrl,
    decimal Rating,
    int Reviews,
    bool Verified,
    string ResponseTime);
}
