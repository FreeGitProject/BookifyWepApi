using Bookify.Domain.Apartments;

namespace Bookify.Api.Controllers.Apartments
{
    public sealed record UpdateApartmentRequest(
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
