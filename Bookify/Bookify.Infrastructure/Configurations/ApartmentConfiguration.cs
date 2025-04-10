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
            .HasConversion(description => description.Value, value => new Description(value));

        builder.OwnsOne(apartment => apartment.Price, priceBuilder =>
        {
            priceBuilder.Property(money => money.Currency)
                .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
        });

        builder.OwnsOne(apartment => apartment.CleaningFee, priceBuilder =>
        {
            priceBuilder.Property(money => money.Currency)
                .HasConversion(currency => currency.Code, code => Currency.FromCode(code));
        });
        builder.OwnsMany(apartment => apartment.Images, imageBuilder =>
        {
            imageBuilder.WithOwner().HasForeignKey("ApartmentId");

            imageBuilder.Property(i => i.Url)
                .HasColumnName("url") // optional; EF will snake_case automatically
                .IsRequired();

            imageBuilder.ToTable("apartment_images");

            // Optional: use composite key (ApartmentId + Url) or add an index
            imageBuilder.HasKey("ApartmentId", "Url");
        });
        // Property details
        builder.Property(apartment => apartment.Bedrooms)
            .IsRequired();

        builder.Property(apartment => apartment.Bathrooms)
            .IsRequired();

        builder.Property(apartment => apartment.Size)
            .HasPrecision(18, 2)
            .IsRequired();

        builder.Property(apartment => apartment.Type)
            .HasConversion(
                type => (int)type,
                value => (ApartmentType)value)
            .IsRequired();

        builder.Property(apartment => apartment.Floor)
            .IsRequired();

        builder.Property(apartment => apartment.MaxGuests)
            .IsRequired();
        // Amenity flags
        builder.Property(apartment => apartment.HasParking)
            .IsRequired();

        builder.Property(apartment => apartment.HasBalcony)
            .IsRequired();

        builder.Property(apartment => apartment.HasAirConditioning)
            .IsRequired();

        builder.Property(apartment => apartment.HasHeating)
            .IsRequired();

        // Tracking
        builder.Property(apartment => apartment.LastBookedOnUtc)
            .HasColumnName("last_booked_on_utc");

        builder.Property<uint>("Version").IsRowVersion();
    }
}