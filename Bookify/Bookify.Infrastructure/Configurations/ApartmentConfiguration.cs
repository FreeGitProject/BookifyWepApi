using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Bookify.Infrastructure.Configurations;

internal sealed class ApartmentConfiguration : IEntityTypeConfiguration<Apartment>
{
    public void Configure(EntityTypeBuilder<Apartment> builder)
    {
        builder.ToTable("apartments");

        builder.HasKey(apartment => apartment.Id);

        builder.OwnsOne(apartment => apartment.Address);

        builder.Property(apartment => apartment.Name)
            .HasMaxLength(200)
            .HasConversion(name => name.Value, value => new Name(value));

        builder.Property(apartment => apartment.Description)
            .HasMaxLength(2000)
            .HasConversion(desc => desc.Value, value => new Description(value));

        builder.OwnsOne(apartment => apartment.Price, priceBuilder =>
        {
            priceBuilder.Property(money => money.Currency)
                .HasConversion(c => c.Code, code => Currency.FromCode(code));
        });

        builder.OwnsOne(apartment => apartment.CleaningFee, priceBuilder =>
        {
            priceBuilder.Property(money => money.Currency)
                .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
        });

        builder.OwnsOne(apartment => apartment.OriginalPrice, priceBuilder =>
        {
            priceBuilder.Property(money => money.Currency)
                .HasConversion(c => c.Code, code => Currency.FromCode(code));
        });

        builder.Property(a => a.Bedrooms);
        builder.Property(a => a.Bathrooms);
        builder.Property(a => a.Area);
        builder.Property(a => a.MaxGuests);
        builder.Property(a => a.Rating).HasPrecision(3, 2);
        builder.Property(a => a.Reviews);
        builder.Property(a => a.Featured);
        builder.Property(a => a.PropertyType);

        builder.OwnsMany(a => a.Images, img =>
        {
            img.ToTable("apartment_images");
            img.Property(i => i.Url).HasMaxLength(1000);
        });

        builder.OwnsMany(a => a.Amenities, amenity =>
        {
            amenity.ToTable("apartment_amenities");
            amenity.Property(a => a.Type)
                   .HasConversion<int>(); // store enum as int
            amenity.Property(a => a.Included);
        });


        builder.OwnsOne(a => a.Host, host =>
        {
            host.Property(h => h.Name).HasMaxLength(200);
            host.Property(h => h.AvatarUrl).HasMaxLength(1000);
            host.Property(h => h.Rating);
            host.Property(h => h.Reviews);
            host.Property(h => h.Verified);
            host.Property(h => h.ResponseTime);
        });

        builder.OwnsMany(a => a.NearbyPlaces, np =>
        {
            np.ToTable("apartment_nearby_places");
            np.Property(n => n.Name).HasMaxLength(200);
            np.Property(n => n.Distance).HasMaxLength(50);
            np.Property(n => n.Type).HasMaxLength(100);
        });

        builder.OwnsOne(a => a.Policies, policy =>
        {
            policy.Property(p => p.CheckIn).HasMaxLength(50);
            policy.Property(p => p.CheckOut).HasMaxLength(50);
            policy.Property(p => p.MinStay);
            policy.Property(p => p.Cancellation).HasMaxLength(500);
        });

        builder.Property<uint>("Version").IsRowVersion();
    }
}
