namespace Bookify.Domain.Apartments;

public interface IApartmentRepository
{
    Task<Apartment?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    void Add(Apartment apartment); // For creating a new apartment
    void Update(Apartment apartment); // For updating an apartment
}