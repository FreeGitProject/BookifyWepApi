using Bookify.Application.Apartments.SearchApartments;

namespace Bookify.Application.Apartments.GetApartment
{

    public sealed class ApartmentDetailResponse
    {
        public Guid Id { get; init; }
        public string Name { get; init; } = string.Empty;

        public AddressResponse Address { get; init; } = default!;

        public decimal Price { get; init; }
        public decimal OriginalPrice { get; init; }
        public string Currency { get; init; } = "USD";

        public decimal Rating { get; init; }
        public int Reviews { get; init; }

        public int Bedrooms { get; init; }
        public int Bathrooms { get; init; }
        public int Area { get; init; }
        public int MaxGuests { get; init; }

        public string PropertyType { get; init; } = string.Empty;

        public List<string> Images { get; set; } = new();
        public List<AmenityResponse> Amenities { get; set; } = new();

        public string Description { get; init; } = string.Empty;

        public HostResponse Host { get; set; } = default!;
        public List<NearbyPlaceResponse> NearbyPlaces { get; set; } = new();

        public PoliciesResponse Policies { get; set; } = default!;
    }

    //public sealed class AddressResponse
    //{
    //    public string Country { get; init; } = string.Empty;
    //    public string State { get; init; } = string.Empty;
    //    public string ZipCode { get; init; } = string.Empty;
    //    public string City { get; init; } = string.Empty;
    //    public string Street { get; init; } = string.Empty;
    //}

    public sealed class AmenityResponse
    {
        public string Name { get; init; } = string.Empty;
        public string Icon { get; init; } = string.Empty;
        public bool Included { get; init; }
    }

    public sealed class HostResponse
    {
        public string Name { get; init; } = string.Empty;
        public string Avatar { get; init; } = string.Empty;
        public decimal Rating { get; init; }
        public int Reviews { get; init; }
        public bool Verified { get; init; }
        public string ResponseTime { get; init; } = string.Empty;
    }

    public sealed class NearbyPlaceResponse
    {
        public string Name { get; init; } = string.Empty;
        public string Distance { get; init; } = string.Empty;
        public string Type { get; init; } = string.Empty;
    }

    public sealed class PoliciesResponse
    {
        public string CheckIn { get; init; } = string.Empty;
        public string CheckOut { get; init; } = string.Empty;
        public int MinStay { get; init; }
        public string Cancellation { get; init; } = string.Empty;
    }

}
