using Bookify.Domain.Apartments;
using Microsoft.EntityFrameworkCore;

namespace Bookify.Infrastructure.Repositories;

internal sealed class ApartmentRepository : Repository<Apartment>, IApartmentRepository
{
    public ApartmentRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
    }
    //public void Update(Apartment apartment)
    //{
    //    // EF Core already tracks the entity if it was loaded via GetByIdAsync.
    //    // But if you want to attach a detached entity:
    //    dbContext.Update(apartment);
    //}
}