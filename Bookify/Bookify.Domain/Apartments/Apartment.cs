using Bookify.Domain.Abstractions;
using Bookify.Domain.Shared;

namespace Bookify.Domain.Apartments;

//public sealed class Apartment : Entity
//{
//    public Apartment(
//        Guid id,
//        Name name,
//        Description description,
//        Address address,
//        Money price,
//        Money cleaningFee,
//        List<Amenity> amenities)
//        : base(id)
//    {
//        Name = name;
//        Description = description;
//        Address = address;
//        Price = price;
//        CleaningFee = cleaningFee;
//        Amenities = amenities;
//    }
//    private Apartment()
//    { 
//    }
//    public Name Name { get; private set; }

//    public Description Description { get; private set; }

//    public Address Address { get; private set; }

//    public Money Price { get; private set; }

//    public Money CleaningFee { get; private set; }

//    public DateTime? LastBookedOnUtc { get; internal set; }

//    public List<Amenity> Amenities { get; private set; } = new();
//}
public sealed class Apartment : Entity
{
    public Apartment(
        Guid id,
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        Money originalPrice,
        int bedrooms,
        int bathrooms,
        int area,
        int maxGuests,
        decimal rating,
        int reviews,
        bool featured,
        PropertyType propertyType,
        List<Image> images,
        List<Amenity> amenities,
        Host host,
        List<NearbyPlace> nearbyPlaces,
        Policies policies)
        : base(id)
    {
        Name = name;
        Description = description;
        Address = address;
        Price = price;
        CleaningFee = cleaningFee;
        OriginalPrice = originalPrice;
        Bedrooms = bedrooms;
        Bathrooms = bathrooms;
        Area = area;
        MaxGuests = maxGuests;
        Rating = rating;
        Reviews = reviews;
        Featured = featured;
        PropertyType = propertyType;
        Images = images;
        Amenities = amenities;
        Host = host;
        NearbyPlaces = nearbyPlaces;
        Policies = policies;
    }

    private Apartment() { }

    public Name Name { get; private set; }
    public Description Description { get; private set; }
    public Address Address { get; private set; }

    public Money Price { get; private set; }
    public Money CleaningFee { get; private set; }
    public Money OriginalPrice { get; private set; }

    public int Bedrooms { get; private set; }
    public int Bathrooms { get; private set; }
    public int Area { get; private set; }
    public int MaxGuests { get; private set; }

    public decimal Rating { get; private set; }
    public int Reviews { get; private set; }

    public bool Featured { get; private set; }
    public PropertyType PropertyType { get; private set; }

    public List<Image> Images { get; private set; } = new();
    public List<Amenity> Amenities { get; private set; } = new();
    public Host Host { get; private set; }
    public List<NearbyPlace> NearbyPlaces { get; private set; } = new();
    public Policies Policies { get; private set; }

    public DateTime? LastBookedOnUtc { get; internal set; }

    // Add a single image (idempotent)
    public void AddImage(Image image)
    {
        if (image is null) throw new ArgumentNullException(nameof(image));
        if (Images.Any(i => string.Equals(i.Url, image.Url, StringComparison.OrdinalIgnoreCase)))
            return;

        Images.Add(image);
    }

    // Add many (idempotent)
    public void AddImages(IEnumerable<Image> images)
    {
        if (images is null) throw new ArgumentNullException(nameof(images));

        foreach (var img in images)
        {
            AddImage(img);
        }
    }

    // inside Bookify.Domain.Apartments.Apartment
    public void AddOrUpdateAmenity(AmenityType type, bool included)
    {
        // find existing by type
        var index = Amenities.FindIndex(a => a.Type == type);

        if (index >= 0)
        {
            var existing = Amenities[index];
            // if nothing changed, keep as-is
            if (existing.Included == included) return;

            // replace existing record with new one (record is immutable)
            Amenities[index] = new Amenity(type, included);
            return;
        }

        // add new amenity
        Amenities.Add(new Amenity(type, included));
    }

    public void RemoveAmenity(AmenityType type)
    {
        var idx = Amenities.FindIndex(a => a.Type == type);
        if (idx >= 0) Amenities.RemoveAt(idx);
    }

}
