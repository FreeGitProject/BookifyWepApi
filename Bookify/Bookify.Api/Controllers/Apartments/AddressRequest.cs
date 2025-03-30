namespace Bookify.Api.Controllers.Apartments
{
    public sealed record AddressRequest(
        string Country,
        string State,
        string ZipCode,
        string City,
        string Street);

}
