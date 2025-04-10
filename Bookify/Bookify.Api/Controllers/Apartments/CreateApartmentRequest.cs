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
     int Bedrooms,
     int Bathrooms,
     decimal Size,
     ApartmentType Type,
     List<int> Amenities,
     List<string> ImageUrls,
     bool HasParking = false,
     bool HasBalcony = false,
     bool HasAirConditioning = false,
     bool HasHeating = false,
     int Floor = 1,
     int MaxGuests = 2
 );


}
