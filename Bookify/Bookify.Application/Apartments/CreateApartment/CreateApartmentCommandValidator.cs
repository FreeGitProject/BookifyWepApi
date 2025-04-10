using FluentValidation;

namespace Bookify.Application.Apartments.CreateApartment
{
    internal sealed class CreateApartmentCommandValidator
        : AbstractValidator<CreateApartmentCommand>
    {
        public CreateApartmentCommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("Name is required.");
            RuleFor(c => c.Description).NotEmpty().WithMessage("Description is required.");

            RuleFor(c => c.Address)
                .NotNull()
                .WithMessage("Address is required.")
                .ChildRules(address =>
                {
                    address.RuleFor(a => a.Country).NotEmpty().WithMessage("Country is required.");
                    address.RuleFor(a => a.State).NotEmpty().WithMessage("State is required.");
                    address.RuleFor(a => a.ZipCode).NotEmpty().WithMessage("Zip code is required.");
                    address.RuleFor(a => a.City).NotEmpty().WithMessage("City is required.");
                    address.RuleFor(a => a.Street).NotEmpty().WithMessage("Street is required.");
                });

            RuleFor(c => c.Price)
                .NotNull()
                .WithMessage("Price is required.")
                .Must(price => !price.IsZero())
                .WithMessage("Price must be greater than zero.");

            RuleFor(c => c.CleaningFee)
                .NotNull()
                .WithMessage("Cleaning fee is required.")
                .Must(fee => !fee.IsZero() || fee.Amount >= 0)
                .WithMessage("Cleaning fee cannot be negative.");

            RuleFor(c => c.Bedrooms)
                .GreaterThan(0)
                .WithMessage("Bedrooms must be greater than 0.");

            RuleFor(c => c.Bathrooms)
                .GreaterThan(0)
                .WithMessage("Bathrooms must be greater than 0.");

            RuleFor(c => c.Size)
                .GreaterThan(0)
                .WithMessage("Size must be greater than 0.");

            RuleFor(c => c.Type)
                .IsInEnum()
                .WithMessage("Invalid apartment type.");

            RuleFor(c => c.Floor)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor cannot be negative.");

            RuleFor(c => c.MaxGuests)
                .GreaterThan(0)
                .WithMessage("Maximum guests must be greater than 0.");

            RuleFor(c => c.Amenities)
                .NotNull()
                .WithMessage("Amenities list is required.");

            RuleFor(c => c.Images)
                .NotNull()
                .WithMessage("Images list is required.")
                .Must(images => images != null && images.Any() &&
                     images.All(i => !string.IsNullOrWhiteSpace(i.Url)))
                .WithMessage("At least one valid image URL is required.");
        }
    }
}