namespace Bookify.Domain.Apartments;

public interface IApartmentRepository
{
    Task<Apartment?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    void Add(Apartment apartment);
    void Update(Apartment apartment); // persist changes (may be no-op depending on implementation)
}