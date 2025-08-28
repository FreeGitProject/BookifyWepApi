namespace Bookify.Application.Apartments.SearchApartments;

//public sealed class ApartmentResponse
//{
//    public Guid Id { get; init; }

//    public string Name { get; init; }

//    public string Description { get; init; }

//    public decimal Price { get; init; }

//    public string Currency { get; init; }

//    public AddressResponse Address { get; set; }
//}
public sealed class ApartmentResponse
{
    public Guid Id { get; init; }
    public string Name { get; init; }
    public AddressResponse Address { get; set; }

    public decimal Price { get; init; }
    public decimal OriginalPrice { get; init; }
    public string Currency { get; init; }

    public decimal Rating { get; init; }
    public int Reviews { get; init; }

    public int Bedrooms { get; init; }
    public int Bathrooms { get; init; }
    public int Area { get; init; }
    public int MaxGuests { get; init; }

    public string Image { get; set; }   // pick first/featured image
                                        // mapped as string from SQL
    public string AmenitiesRaw { get; set; }
    public List<string> Amenities { get; set; } = new();

    public bool Featured { get; init; }
    public string PropertyType { get; init; }
    public string Host { get; init; }
}
