using Bookify.Application.Apartments.SearchApartments;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.GetApartment
{
    public sealed class ApartmentDetailResponse
    {
        public Guid Id { get; init; }
        public required string Name { get; init; }
        public string Description { get; init; }
        public AddressResponse Address { get; set; }
        public decimal PriceAmount { get; init; }
        public string PriceCurrency { get; init; }
        public decimal CleaningFeeAmount { get; init; }
        public string CleaningFeeCurrency { get; init; }
        public int Bedrooms { get; init; }
        public int Bathrooms { get; init; }
        public decimal Size { get; init; }
        public ApartmentType Type { get; init; }
        public int Floor { get; init; }
        public int MaxGuests { get; init; }
        public bool HasParking { get; init; }
        public bool HasBalcony { get; init; }
        public bool HasAirConditioning { get; init; }
        public bool HasHeating { get; init; }
        public List<Amenity> Amenities { get; set; } = new();
        public List<string> ImageUrls { get; set; } = new();
        public DateTime? LastBookedOnUtc { get; init; }
    }
}