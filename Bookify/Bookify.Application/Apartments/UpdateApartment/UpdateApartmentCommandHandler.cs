using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.UpdateApartment
{
    internal sealed class UpdateApartmentCommandHandler : ICommandHandler<UpdateApartmentCommand, Guid>
    {
        private readonly IApartmentRepository _apartmentRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UpdateApartmentCommandHandler(
            IApartmentRepository apartmentRepository,
            IUnitOfWork unitOfWork)
        {
            _apartmentRepository = apartmentRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Guid>> Handle(UpdateApartmentCommand request, CancellationToken cancellationToken)
        {
            var apartment = await _apartmentRepository.GetByIdAsync(request.Id, cancellationToken);

            if (apartment is null)
            {
                return Result.Failure<Guid>(ApartmentErrors.NotFound);
                //return Result.Failure<Guid>("Apartment not found");
            }

            apartment.Update(
                new Name(request.Name),
                new Description(request.Description),
                request.Address,
                request.Price,
                request.CleaningFee,
                request.Amenities);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return apartment.Id;
        }
    }
}
