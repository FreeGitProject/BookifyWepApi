namespace Bookify.Api.Controllers.Apartments;
public sealed record AmenityRequestDto(int Type, bool Included);
public sealed record AddApartmentAmenitiesRequest(List<AmenityRequestDto> Amenities);