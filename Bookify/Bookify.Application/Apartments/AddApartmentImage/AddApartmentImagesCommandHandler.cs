using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using FluentValidation;

namespace Bookify.Application.Apartments.AddApartmentImage;

internal sealed class AddApartmentImagesCommandHandler
    : ICommandHandler<AddApartmentImagesCommand, Guid>
{
    private readonly IApartmentRepository _apartmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AddApartmentImagesCommandHandler(
        IApartmentRepository apartmentRepository,
        IUnitOfWork unitOfWork)
    {
        _apartmentRepository = apartmentRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(AddApartmentImagesCommand request, CancellationToken cancellationToken)
    {
        var apartment = await _apartmentRepository.GetByIdAsync(request.ApartmentId, cancellationToken);

        if (apartment is null)
            return Result.Failure<Guid>(ApartmentErrors.NotFound);

        // Map incoming urls to domain Image objects
        var images = request.ImageUrls
                            .Where(u => !string.IsNullOrWhiteSpace(u))
                            .Select(u => new Image(u.Trim()))
                            .ToList();

        if (!images.Any())
            return Result.Failure<Guid>(ApartmentErrors.InvalidImages); // create an error constant

        // let the aggregate enforce idempotency/validation
        apartment.AddImages(images);

        // optional repository.Update(apartment) depending on your repo pattern
        _apartmentRepository.Update(apartment);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return apartment.Id;
    }
}