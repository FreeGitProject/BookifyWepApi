using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;

namespace Bookify.Application.Apartments.CreateApartment
{
    internal sealed class CreateApartmentCommandHandler : ICommandHandler<CreateApartmentCommand, Guid>
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

        public async Task<Result<Guid>> Handle(CreateApartmentCommand request, CancellationToken cancellationToken)
        {
            var apartment = new Apartment(
                request.Id,
                new Name(request.Name),
                new Description(request.Description),
                request.Address,
                request.Price,
                request.CleaningFee,
                request.Amenities);

            _apartmentRepository.Add(apartment);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return apartment.Id;
        }
    }
}
