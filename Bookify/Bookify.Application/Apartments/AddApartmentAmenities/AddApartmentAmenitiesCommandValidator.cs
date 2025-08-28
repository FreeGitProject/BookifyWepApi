using Bookify.Domain.Apartments;
using FluentValidation;

namespace Bookify.Application.Apartments.AddApartmentAmenities;

internal sealed class AddApartmentAmenitiesCommandValidator : AbstractValidator<AddApartmentAmenitiesCommand>
{
    public AddApartmentAmenitiesCommandValidator()
    {
        RuleFor(x => x.ApartmentId).NotEmpty();

        RuleFor(x => x.Amenities)
            .NotNull().WithMessage("Amenities must be provided.")
            .Must(list => list.Any()).WithMessage("At least one amenity must be provided.");

        RuleForEach(x => x.Amenities).ChildRules(a =>
        {
            a.RuleFor(x => x.Type)
             .Must(t => Enum.IsDefined(typeof(AmenityType), t))
             .WithMessage((_, t) => $"Amenity type '{t}' is invalid.");

            // Included is a bool – no extra rule needed
        });
    }
}
