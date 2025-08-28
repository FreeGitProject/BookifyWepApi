using FluentValidation;

namespace Bookify.Application.Apartments.RemoveApartmentNearbyPlace;

internal sealed class RemoveApartmentNearbyPlaceCommandValidator
    : AbstractValidator<RemoveApartmentNearbyPlaceCommand>
{
    public RemoveApartmentNearbyPlaceCommandValidator()
    {
        RuleFor(x => x.ApartmentId).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Type).NotEmpty().MaximumLength(100);
    }
}