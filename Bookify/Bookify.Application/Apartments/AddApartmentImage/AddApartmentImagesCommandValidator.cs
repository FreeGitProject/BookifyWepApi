using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookify.Application.Apartments.AddApartmentImage;

internal sealed class AddApartmentImagesCommandValidator : AbstractValidator<AddApartmentImagesCommand>
{
    public AddApartmentImagesCommandValidator()
    {
        RuleFor(c => c.ApartmentId).NotEmpty();

        RuleFor(c => c.ImageUrls)
            .NotNull()
            .Must(list => list.Any())
            .WithMessage("At least one image must be provided.");

        RuleForEach(c => c.ImageUrls)
            .NotEmpty()
            .Must(BeAValidUrl)
            .WithMessage("Each image must be a valid absolute URL.");
    }

    private static bool BeAValidUrl(string url)
    {
        if (string.IsNullOrWhiteSpace(url)) return false;
        return Uri.TryCreate(url, UriKind.Absolute, out var tmp)
               && (tmp.Scheme == Uri.UriSchemeHttp || tmp.Scheme == Uri.UriSchemeHttps);
    }
}
