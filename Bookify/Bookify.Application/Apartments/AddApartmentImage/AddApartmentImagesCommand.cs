using Bookify.Application.Abstractions.Messaging;

namespace Bookify.Application.Apartments.AddApartmentImage;

public sealed record AddApartmentImagesCommand(Guid ApartmentId, IEnumerable<string> ImageUrls)
    : ICommand<Guid>;