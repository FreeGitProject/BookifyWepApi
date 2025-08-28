using Bookify.Application.Abstractions.Messaging;

namespace Bookify.Application.Apartments.CreateApartment;

public sealed record CreateApartmentCommand(
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
    int PropertyType
) : ICommand<Guid>;
public sealed record AddressDto(string Country, string State, string ZipCode, string City, string Street);
public sealed record MoneyDto(decimal Amount, string Currency);