using Bookify.Domain.Abstractions;
using Bookify.Domain.Shared;

namespace Bookify.Domain.Apartments;

public sealed class Apartment : Entity
{
    private Apartment() { } // EF Core constructor

    public Apartment(
        Guid id,
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        int bedrooms,
        int bathrooms,
        decimal size,
        ApartmentType type,
        List<Amenity> amenities,
        List<Image> images,
        bool hasParking = false,
        bool hasBalcony = false,
        bool hasAirConditioning = false,
        bool hasHeating = false,
        int floor = 1,
        int maxGuests = 2)
        : base(id)
    {
        Name = name;
        Description = description;
        Address = address;
        Price = price;
        CleaningFee = cleaningFee;
        Bedrooms = bedrooms;
        Bathrooms = bathrooms;
        Size = size;
        Type = type;
        Amenities = amenities;
        Images = images;
        HasParking = hasParking;
        HasBalcony = hasBalcony;
        HasAirConditioning = hasAirConditioning;
        HasHeating = hasHeating;
        Floor = floor;
        MaxGuests = maxGuests;
    }

    public Name Name { get; private set; }
    public Description Description { get; private set; }
    public Address Address { get; private set; }
    public Money Price { get; private set; }
    public Money CleaningFee { get; private set; }
    public DateTime? LastBookedOnUtc { get; internal set; }

    // Property Details
    public int Bedrooms { get; private set; }
    public int Bathrooms { get; private set; }
    public decimal Size { get; private set; } // in square meters
    public ApartmentType Type { get; private set; }
    public int Floor { get; private set; }
    public int MaxGuests { get; private set; }

    // Amenity Flags
    public bool HasParking { get; private set; }
    public bool HasBalcony { get; private set; }
    public bool HasAirConditioning { get; private set; }
    public bool HasHeating { get; private set; }

    public List<Amenity> Amenities { get; private set; } = new();
    public List<Image> Images { get; private set; } = new();

    public static Result<Apartment> Create(
        Guid id,
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        int bedrooms,
        int bathrooms,
        decimal size,
        ApartmentType type,
        List<Amenity> amenities,
        List<Image> images,
        bool hasParking = false,
        bool hasBalcony = false,
        bool hasAirConditioning = false,
        bool hasHeating = false,
        int floor = 1,
        int maxGuests = 2)
    {
        // Validate basic requirements
        if (bedrooms <= 0)
            return Result.Failure<Apartment>(ApartmentErrors.InvalidBedrooms);

        if (bathrooms <= 0)
            return Result.Failure<Apartment>(ApartmentErrors.InvalidBathrooms);

        if (size <= 0)
            return Result.Failure<Apartment>(ApartmentErrors.InvalidSize);

        if (floor < 0)
            return Result.Failure<Apartment>(ApartmentErrors.InvalidFloor);

        if (maxGuests <= 0)
            return Result.Failure<Apartment>(ApartmentErrors.InvalidMaxGuests);

        if (!images.Any())
            return Result.Failure<Apartment>(ApartmentErrors.AtLeastOneImageRequired);

        var apartment = new Apartment(
            id,
            name,
            description,
            address,
            price,
            cleaningFee,
            bedrooms,
            bathrooms,
            size,
            type,
            amenities,
            images,
            hasParking,
            hasBalcony,
            hasAirConditioning,
            hasHeating,
            floor,
            maxGuests);

        return apartment;
    }

    public Result Update(
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        int bedrooms,
        int bathrooms,
        decimal size,
        ApartmentType type,
        List<Amenity> amenities,
        List<Image> images,
        bool hasParking = false,
        bool hasBalcony = false,
        bool hasAirConditioning = false,
        bool hasHeating = false,
        int floor = 1,
        int maxGuests = 2)
    {
        // Validate updates
        if (bedrooms <= 0)
            return Result.Failure(ApartmentErrors.InvalidBedrooms);

        if (bathrooms <= 0)
            return Result.Failure(ApartmentErrors.InvalidBathrooms);

        if (size <= 0)
            return Result.Failure(ApartmentErrors.InvalidSize);

        if (!images.Any())
            return Result.Failure(ApartmentErrors.AtLeastOneImageRequired);

        Name = name;
        Description = description;
        Address = address;
        Price = price;
        CleaningFee = cleaningFee;
        Bedrooms = bedrooms;
        Bathrooms = bathrooms;
        Size = size;
        Type = type;
        Amenities = amenities;
        Images = images;
        HasParking = hasParking;
        HasBalcony = hasBalcony;
        HasAirConditioning = hasAirConditioning;
        HasHeating = hasHeating;
        Floor = floor;
        MaxGuests = maxGuests;

        return Result.Success();
    }

    public void MarkAsBooked(DateTime utcNow)
    {
        LastBookedOnUtc = utcNow;
    }
}