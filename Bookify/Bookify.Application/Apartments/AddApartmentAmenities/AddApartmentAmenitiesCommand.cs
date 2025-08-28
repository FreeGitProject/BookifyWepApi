using Bookify.Application.Abstractions.Messaging;

namespace Bookify.Application.Apartments.AddApartmentAmenities;

public sealed record AmenityDto(int Type, bool Included);
public sealed record AddApartmentAmenitiesCommand(
    Guid ApartmentId,
    List<AmenityDto> Amenities
) : ICommand<Guid>;
