using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.RemoveApartmentNearbyPlace;

internal sealed class RemoveApartmentNearbyPlaceCommandHandler
    : ICommandHandler<RemoveApartmentNearbyPlaceCommand, Guid>
{
    private readonly IApartmentRepository _apartmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public RemoveApartmentNearbyPlaceCommandHandler(
        IApartmentRepository apartmentRepository,
        IUnitOfWork unitOfWork)
    {
        _apartmentRepository = apartmentRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(RemoveApartmentNearbyPlaceCommand request, CancellationToken cancellationToken)
    {
        var apartment = await _apartmentRepository.GetByIdAsync(request.ApartmentId, cancellationToken);

        if (apartment is null)
            return Result.Failure<Guid>(ApartmentErrors.NotFound);

        apartment.RemoveNearbyPlace(request.Name, request.Type);

        _apartmentRepository.Update(apartment);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return apartment.Id;
    }
}