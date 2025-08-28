using Bookify.Application.Abstractions.Messaging;
using Bookify.Domain.Abstractions;
using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

namespace Bookify.Application.Apartments.CreateApartment;

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
        var apartment = new Apartment(
            Guid.NewGuid(),
            new Name(request.Name),
            new Description(request.Description),
            new Address(request.Address.Country, request.Address.State, request.Address.ZipCode, request.Address.City, request.Address.Street),
            new Money(request.Price.Amount, Currency.FromCode(request.Price.Currency)),
            new Money(request.CleaningFee.Amount, Currency.FromCode(request.CleaningFee.Currency)),
            new Money(request.OriginalPrice.Amount, Currency.FromCode(request.OriginalPrice.Currency)),
            request.Bedrooms,
            request.Bathrooms,
            request.Area,
            request.MaxGuests,
            request.Rating,
            request.Reviews,
            request.Featured,
            (PropertyType)request.PropertyType,
            new List<Image>(),          // empty for now
            new List<Amenity>(),        // empty for now
            null!,                      // host will be added later
            new List<NearbyPlace>(),    // empty for now
            null!                       // policies will be added later
        );

        _apartmentRepository.Add(apartment);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return apartment.Id;
    }
}