using FluentValidation;

namespace Bookify.Application.Apartments.CreateApartment
{
    internal sealed class CreateApartmentCommandValidator : AbstractValidator<CreateApartmentCommand>
    {
        public CreateApartmentCommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.Address).NotNull();
            RuleFor(c => c.Price).NotNull();
            RuleFor(c => c.CleaningFee).NotNull();
            RuleFor(c => c.Amenities).NotNull();
        }
    }
}
