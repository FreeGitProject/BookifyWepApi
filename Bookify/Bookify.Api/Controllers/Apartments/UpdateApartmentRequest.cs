using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Api.Controllers.Apartments
{
    public sealed record UpdateApartmentRequest(
       string Name,
       string Description,
       Address Address,
       Money Price,
       Money CleaningFee,
       List<Amenity> Amenities);
}
