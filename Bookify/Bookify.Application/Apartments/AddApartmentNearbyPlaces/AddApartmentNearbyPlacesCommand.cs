using Bookify.Application.Abstractions.Messaging;

namespace Bookify.Application.Apartments.AddApartmentNearbyPlaces;

public sealed record NearbyPlaceDto(string Name, string Distance, string Type);

public sealed record AddApartmentNearbyPlacesCommand(
    Guid ApartmentId,
    List<NearbyPlaceDto> Places
) : ICommand<Guid>;
