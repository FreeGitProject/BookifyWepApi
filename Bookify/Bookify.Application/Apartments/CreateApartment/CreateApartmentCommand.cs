using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Application.Apartments.CreateApartment
{
    //public sealed record CreateApartmentCommand(
    //  string Name,
    //  string Description,
    //  string Country,
    //  string State,
    //  string ZipCode,
    //  string City,
    //  string Street,
    //  decimal PriceAmount,
    //  string PriceCurrency,
    //  decimal CleaningFeeAmount,
    //  string CleaningFeeCurrency,
    //  List<string> Amenities) : ICommand<Guid>;
    public sealed record CreateApartmentCommand(
    Guid Id,
    string Name,
    string Description,
    Address Address,
    Money Price,
    Money CleaningFee,
    List<Amenity> Amenities) : ICommand<Guid>;
}
