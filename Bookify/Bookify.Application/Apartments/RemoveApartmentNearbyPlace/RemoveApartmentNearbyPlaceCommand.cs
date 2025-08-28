using Bookify.Application.Abstractions.Messaging;

namespace Bookify.Application.Apartments.RemoveApartmentNearbyPlace;

public sealed record RemoveApartmentNearbyPlaceCommand(
    Guid ApartmentId,
    string Name,
    string Type
) : ICommand<Guid>;
