using Bookify.Domain.Abstractions;
using Bookify.Domain.Shared;

namespace Bookify.Domain.Apartments;

public sealed class Apartment : Entity
{
    public Apartment(
        Guid id,
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        List<Amenity> amenities,
        List<Image> images)
        : base(id)
    {
        Name = name;
        Description = description;
        Address = address;
        Price = price;
        CleaningFee = cleaningFee;
        Amenities = amenities;
        Images = images;
    }
    private Apartment()
    { 
    }
    public Name Name { get; private set; }

    public Description Description { get; private set; }

    public Address Address { get; private set; }

    public Money Price { get; private set; }

    public Money CleaningFee { get; private set; }

    public DateTime? LastBookedOnUtc { get; internal set; }

    public List<Amenity> Amenities { get; private set; } = new();
    public List<Image> Images { get; private set; } = new();

    /// <summary>
    /// Creates a new apartment instance.
    /// </summary>
    public static Apartment Create(
        Guid id,
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        List<Amenity> amenities,
        List<Image> images)
    {
       
        return  new Apartment(id, name, description, address, price, cleaningFee, amenities, images);
    }

    /// <summary>
    /// Updates the apartment details.
    /// </summary>
    public Result Update(
        Name name,
        Description description,
        Address address,
        Money price,
        Money cleaningFee,
        List<Amenity> amenities,
         List<Image> images)
    {
        Name = name;
        Description = description;
        Address = address;
        Price = price;
        CleaningFee = cleaningFee;
        Amenities = amenities;
        Images = images;

        return Result.Success();
    }
}