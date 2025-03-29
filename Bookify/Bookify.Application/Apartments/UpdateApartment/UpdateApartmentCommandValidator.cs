using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookify.Application.Apartments.UpdateApartment
{
    internal sealed class UpdateApartmentCommandValidator : AbstractValidator<UpdateApartmentCommand>
    {
        public UpdateApartmentCommandValidator()
        {
            RuleFor(c => c.Id).NotEmpty();
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.Description).NotEmpty();
            RuleFor(c => c.Address).NotNull();
            RuleFor(c => c.Price).NotNull();
            RuleFor(c => c.CleaningFee).NotNull();
            RuleFor(c => c.Amenities).NotNull();
        }
    }
}
