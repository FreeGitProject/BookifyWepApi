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
    AddressRequest Address,
    MoneyRequest Price,
    MoneyRequest CleaningFee,
    List<int> Amenities,
    List<string> ImageUrls
    );

}
