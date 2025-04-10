using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Application.Apartments.CreateApartment
{
    internal sealed class CreateApartmentCommandHandler
        : ICommandHandler<CreateApartmentCommand, Guid>
    {
        private readonly IApartmentRepository _apartmentRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateApartmentCommandHandler(
            IApartmentRepository apartmentRepository,
            IUnitOfWork unitOfWork)
        {
            _apartmentRepository = apartmentRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Guid>> Handle(
            CreateApartmentCommand request,
            CancellationToken cancellationToken)
        {
            var apartmentResult = Apartment.Create(
                request.Id,
                new Name(request.Name),
                new Description(request.Description),
                request.Address,
                request.Price,
                request.CleaningFee,
                request.Bedrooms,
                request.Bathrooms,
                request.Size,
                request.Type,
                request.Amenities,
                request.Images,
                request.HasParking,
                request.HasBalcony,
                request.HasAirConditioning,
                request.HasHeating,
                request.Floor,
                request.MaxGuests);

            if (apartmentResult.IsFailure)
            {
                return Result.Failure<Guid>(apartmentResult.Error);
            }

            _apartmentRepository.Add(apartmentResult.Value);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return apartmentResult.Value.Id;
        }
    }
}