using Bookify.Application.Abstractions.Caching;
using Bookify.Application.Apartments.SearchApartments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookify.Application.Apartments.GetApartment
{
    public sealed record GetApartmentByIdQuery(Guid ApartmentId) : ICachedQuery<ApartmentDetailResponse>
    {
        public string CacheKey => $"apartments-{ApartmentId}";
        public TimeSpan? Expiration => null;
    }
}
