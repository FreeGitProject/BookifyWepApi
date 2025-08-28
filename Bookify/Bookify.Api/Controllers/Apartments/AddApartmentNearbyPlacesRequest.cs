namespace Bookify.Api.Controllers.Apartments;

public sealed record NearbyPlaceRequestDto(string Name, string Distance, string Type);

public sealed record AddApartmentNearbyPlacesRequest(List<NearbyPlaceRequestDto> Places);

