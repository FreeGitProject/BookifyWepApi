using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Domain.UnitTests.Apartments;

internal static class ApartmentData
{
    public static Apartment Create(
        Money price,
        Money? cleaningFee = null,
        Guid? id = null,
        Name? name = null,
        Description? description = null,
        Address? address = null,
        int? bedrooms = null,
        int? bathrooms = null,
        decimal? size = null,
        ApartmentType? type = null,
        List<Amenity>? amenities = null,
        List<Image>? images = null,
        bool? hasParking = null,
        bool? hasBalcony = null,
        bool? hasAirConditioning = null,
        bool? hasHeating = null,
        int? floor = null,
        int? maxGuests = null)
    {
        return new Apartment(
            id ?? Guid.NewGuid(),
            name ?? new Name("Test apartment"),
            description ?? new Description("Test description"),
            address ?? new Address("Country", "State", "ZipCode", "City", "Street"),
            price,
            cleaningFee ?? new Money(10.0m, Currency.Usd),
            bedrooms ?? 1,
            bathrooms ?? 1,
            size ?? 50m,
            type ?? ApartmentType.Apartment,
            amenities ?? new List<Amenity>(),
            images ?? new List<Image> { new Image("test-image.jpg") },
            hasParking ?? false,
            hasBalcony ?? false,
            hasAirConditioning ?? false,
            hasHeating ?? false,
            floor ?? 1,
            maxGuests ?? 2);
    }

    public static Apartment CreateDefault() => Create(
        price: new Money(100.0m, Currency.Usd),
        cleaningFee: new Money(10.0m, Currency.Usd));
}