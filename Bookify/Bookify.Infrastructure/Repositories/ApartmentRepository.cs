using Bookify.Domain.Apartments;

namespace Bookify.Infrastructure.Repositories;

internal sealed class ApartmentRepository : Repository<Apartment>, IApartmentRepository
{
    public ApartmentRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
    }
    public void Add(Apartment apartment)
    {
        DbContext.Set<Apartment>().Add(apartment);
    }

    public void Update(Apartment apartment)
    {
        DbContext.Set<Apartment>().Update(apartment);
    }
}