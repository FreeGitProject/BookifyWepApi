using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Api.Controllers.Apartments
{
    //public sealed record CreateApartmentRequest(
    //    string Name,
    //    string Description,
    //    Address Address,
    //    Money Price,
    //    Money CleaningFee,
    //    List<Amenity> Amenities);
    public sealed record CreateApartmentRequest(
    string Name,
    string Description,
    AddressDto Address,
    MoneyDto Price,
    MoneyDto CleaningFee,
    List<int> Amenities);

    public sealed record AddressDto(
        string Country,
        string State,
        string ZipCode,
        string City,
        string Street);

    public sealed record MoneyDto(
        decimal Amount,
        string Currency);

}
