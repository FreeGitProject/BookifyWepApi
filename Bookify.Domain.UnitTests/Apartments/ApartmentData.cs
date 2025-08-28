using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Domain.UnitTests.Apartments;

internal static class ApartmentData
{
    public static Apartment Create(Money price, Money? cleaningFee = null) => new(
        Guid.NewGuid(),
        new Name("Test apartment"),
        new Description("Test description"),
        new Address("Country", "State", "ZipCode", "City", "Street"),
        price,
        cleaningFee ?? Money.Zero(),
       new Money(150.0m, Currency.Usd),              // OriginalPrice (dummy)
        2,                                            // Bedrooms
        1,                                            // Bathrooms
        750,                                          // Area
        3,                                            // MaxGuests
        4.5m,                                         // Rating
        12,                                           // Reviews
        false,                                        // Featured
        PropertyType.Apartment,                       // PropertyType
        new List<Image>                               // Images
        {
            new("https://example.com/test1.jpg")
        },
        new List<Amenity>                             // Amenities
        {
            new(AmenityType.WiFi, true),
            new(AmenityType.AirConditioning, true)
        },
        new Host(                                     // Host
            "Test Host",
            "https://example.com/avatar.jpg",
            4.9m,
            25,
            true,
            "within 1 hour"
        ),
        new List<NearbyPlace>                         // NearbyPlaces
        {
            new("Central Park", "0.5 mi", "Park")
        },
        new Policies(                                 // Policies
            "3:00 PM",
            "11:00 AM",
            2,
            "Free cancellation up to 24 hours"
        )
    );
}
