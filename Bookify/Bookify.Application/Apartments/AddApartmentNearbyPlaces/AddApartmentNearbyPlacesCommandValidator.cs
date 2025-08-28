using FluentValidation;

namespace Bookify.Application.Apartments.AddApartmentNearbyPlaces;

internal sealed class AddApartmentNearbyPlacesCommandValidator : AbstractValidator<AddApartmentNearbyPlacesCommand>
{
    public AddApartmentNearbyPlacesCommandValidator()
    {
        RuleFor(x => x.ApartmentId).NotEmpty();

        RuleFor(x => x.Places)
            .NotNull().WithMessage("Places must be provided.")
            .Must(list => list.Any()).WithMessage("At least one place must be provided.");

        RuleForEach(x => x.Places).ChildRules(p =>
        {
            p.RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            p.RuleFor(x => x.Distance).NotNull().MaximumLength(50);
            p.RuleFor(x => x.Type).NotEmpty().MaximumLength(100);
        });
    }
}