using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.SearchApartments
{
    public sealed class ApartmentResponse
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public decimal Price { get; init; }
        public string Currency { get; init; }
        public AddressResponse Address { get; set; }
        public int Bedrooms { get; init; }
        public int Bathrooms { get; init; }
        public decimal Size { get; init; }
        public ApartmentType Type { get; init; }
        public List<Amenity> Amenities { get; init; } = new();
        public List<string> ImageUrls { get; set; } = new();
        public double? Rating { get; init; }
        public int ReviewCount { get; init; }
    }
}