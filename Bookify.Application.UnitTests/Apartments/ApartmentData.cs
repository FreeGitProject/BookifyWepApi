using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Application.UnitTests.Apartments;

internal static class ApartmentData
{
    //public static Apartment Create() => new(
    //    Guid.NewGuid(),
    //    new Name("Test apartment"),
    //    new Description("Test description"),
    //    new Address("Country", "State", "ZipCode", "City", "Street"),
    //    new Money(100.0m, Currency.Usd),
    //    Money.Zero(),
    //    []);
    public static Apartment Create() => new(
        Guid.NewGuid(),
        new Name("Test apartment"),
        new Description("Test description"),
        new Address("Country", "State", "ZipCode", "City", "Street"),
        new Money(100.0m, Currency.Usd),              // Price
        Money.Zero(),                                 // CleaningFee  
        new Money(150.0m, Currency.Usd),              // OriginalPrice
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
            new("https://example.com/test1.jpg"),
            new("https://example.com/test2.jpg")
        },
        new List<Amenity>                             // Amenities
        {
            new(AmenityType.WiFi, true),
            new(AmenityType.AirConditioning, true),
            new(AmenityType.Parking, false)
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
            new("Central Park", "0.5 mi", "Park"),
            new("Main Station", "1.0 mi", "Transport")
        },
        new Policies(                                 // Policies
            "3:00 PM",
            "11:00 AM",
            2,
            "Free cancellation up to 24 hours"
        )
    );

}
