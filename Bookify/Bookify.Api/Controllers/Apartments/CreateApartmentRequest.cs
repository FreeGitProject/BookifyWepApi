

using Bookify.Application.Apartments.CreateApartment;

namespace Bookify.Api.Controllers.Apartments;

public sealed record CreateApartmentRequest(
    string Name,
    string Description,
    AddressDto Address,
    MoneyDto Price,
    MoneyDto CleaningFee,
    MoneyDto OriginalPrice,
    int Bedrooms,
    int Bathrooms,
    int Area,
    int MaxGuests,
    decimal Rating,
    int Reviews,
    bool Featured,
    int PropertyType // enum int (Apartment, House, Villa, etc.)
);

