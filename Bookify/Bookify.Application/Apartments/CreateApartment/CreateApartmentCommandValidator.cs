using FluentValidation;

namespace Bookify.Application.Apartments.CreateApartment;

internal sealed class CreateApartmentCommandValidator : AbstractValidator<CreateApartmentCommand>
{
    public CreateApartmentCommandValidator()
    {
        RuleFor(c => c.Name).NotEmpty();
        RuleFor(c => c.Description).NotEmpty();
       // RuleFor(c => c.PriceAmount).GreaterThan(0);
      //  RuleFor(c => c.PriceCurrency).NotEmpty();
        RuleFor(c => c.Bedrooms).GreaterThanOrEqualTo(0);
        RuleFor(c => c.Bathrooms).GreaterThanOrEqualTo(0);
        RuleFor(c => c.Area).GreaterThan(0);
        RuleFor(c => c.MaxGuests).GreaterThan(0);
    }
}