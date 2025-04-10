using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Application.Apartments.UpdateApartment
{
    public sealed record UpdateApartmentCommand(
        Guid Id,
        string Name,
        string Description,
        Address Address,
        Money Price,
        Money CleaningFee,
        int Bedrooms,
        int Bathrooms,
        decimal Size,
        ApartmentType Type,
        List<Amenity> Amenities,
        List<Image> Images,
        bool HasParking = false,
        bool HasBalcony = false,
        bool HasAirConditioning = false,
        bool HasHeating = false,
        int Floor = 1,
        int MaxGuests = 2
    ) : ICommand<Guid>;
}