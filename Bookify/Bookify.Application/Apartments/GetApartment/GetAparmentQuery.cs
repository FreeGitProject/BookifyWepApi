using Bookify.Application.Abstractions.Caching;

namespace Bookify.Application.Apartments.GetApartment
{
    public sealed record GetAparmentQuery(Guid AparmentId) : ICachedQuery<ApartmentDetailResponse>
    {
        public string CacheKey => $"aparment-{AparmentId}";

        public TimeSpan? Expiration => null;
    }
}

