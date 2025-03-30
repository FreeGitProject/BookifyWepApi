using Bookify.Domain.Apartments;

namespace Bookify.Api.Controllers.Apartments
{
    public sealed record UpdateApartmentRequest(
       string Name,
       string Description,
       AddressRequest Address,
       MoneyRequest Price,
       MoneyRequest CleaningFee,
      List<int> Amenities);
}
