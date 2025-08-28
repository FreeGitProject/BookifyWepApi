using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.AddApartmentNearbyPlaces;

internal sealed class AddApartmentNearbyPlacesCommandHandler
    : ICommandHandler<AddApartmentNearbyPlacesCommand, Guid>
{
    private readonly IApartmentRepository _apartmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AddApartmentNearbyPlacesCommandHandler(
        IApartmentRepository apartmentRepository,
        IUnitOfWork unitOfWork)
    {
        _apartmentRepository = apartmentRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(AddApartmentNearbyPlacesCommand request, CancellationToken cancellationToken)
    {
        var apartment = await _apartmentRepository.GetByIdAsync(request.ApartmentId, cancellationToken);

        if (apartment is null)
            return Result.Failure<Guid>(ApartmentErrors.NotFound);

        foreach (var p in request.Places)
        {
            // domain method handles idempotency and updates
            apartment.AddOrUpdateNearbyPlace(p.Name.Trim(), p.Distance?.Trim() ?? string.Empty, p.Type.Trim());
        }

        _apartmentRepository.Update(apartment); // safe even if EF is tracking
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return apartment.Id;
    }
}