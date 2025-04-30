using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.SearchApartments
{
    public sealed record SearchApartmentsQuery(
        DateOnly? StartDate = null,
        DateOnly? EndDate = null,
        string? Country = null,
        string? Name = null,
        decimal? MinPrice = null,
        decimal? MaxPrice = null,
        int? Bedrooms = null,
        int? Bathrooms = null,
        ApartmentType? Type = null,
        List<Amenity>? Amenities = null,
        string SortBy = "recommended",
        int Page = 1,
        int PageSize = 10
    ) : IQuery<PagedList<ApartmentResponse>>;

    public sealed record PagedList<T>(
        List<T> Items,
        int Page,
        int PageSize,
        int TotalCount);
}