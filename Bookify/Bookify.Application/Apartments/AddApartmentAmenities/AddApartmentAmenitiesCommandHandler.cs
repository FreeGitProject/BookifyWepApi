using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.AddApartmentAmenities;

internal sealed class AddApartmentAmenitiesCommandHandler
    : ICommandHandler<AddApartmentAmenitiesCommand, Guid>
{
    private readonly IApartmentRepository _apartmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AddApartmentAmenitiesCommandHandler(
        IApartmentRepository apartmentRepository,
        IUnitOfWork unitOfWork)
    {
        _apartmentRepository = apartmentRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(AddApartmentAmenitiesCommand request, CancellationToken cancellationToken)
    {
        // load aggregate (include amenities so EF is tracking the collection)
        var apartment = await _apartmentRepository.GetByIdAsync(request.ApartmentId, cancellationToken);

        if (apartment is null)
            return Result.Failure<Guid>(ApartmentErrors.NotFound);

        // Map and apply
        foreach (var dto in request.Amenities)
        {
            // dto.Type validated by validator, still defensive check is fine:
            if (!Enum.IsDefined(typeof(AmenityType), dto.Type))
            {
                return Result.Failure<Guid>(ApartmentErrors.InvalidAmenity); // define this error
            }

            var amenityType = (AmenityType)dto.Type;
            apartment.AddOrUpdateAmenity(amenityType, dto.Included);
        }

        // Update and persist
        _apartmentRepository.Update(apartment); // may be no-op if tracked, but safe
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return apartment.Id;
    }
}