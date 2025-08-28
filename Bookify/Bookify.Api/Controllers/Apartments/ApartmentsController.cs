using Asp.Versioning;
using Bookify.Application.Apartments.AddApartmentAmenities;
using Bookify.Application.Apartments.AddApartmentImage;
using Bookify.Application.Apartments.CreateApartment;
using Bookify.Application.Apartments.GetApartment;
using Bookify.Application.Apartments.SearchApartments;
using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bookify.Api.Controllers.Apartments;
[Authorize]
[ApiController]
[ApiVersion(ApiVersions.V1)]
[Route("api/v{version:apiVersion}/apartments")]
public class ApartmentsController : ControllerBase
{
    private readonly ISender _sender;

    public ApartmentsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> SearchApartments(
        DateOnly startDate,
        DateOnly endDate,
        CancellationToken cancellationToken)
    {
        var query = new SearchApartmentsQuery(startDate, endDate);

        var result = await _sender.Send(query, cancellationToken);

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAparment(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetAparmentQuery(id);

        var result = await _sender.Send(query, cancellationToken);

        return result.IsSuccess ? Ok(result.Value) : NotFound();
    }
    [HttpPost]
    public async Task<IActionResult> CreateApartment(
        CreateApartmentRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateApartmentCommand(
            request.Name,
            request.Description,
            request.Address,
            request.Price,
            request.CleaningFee,
            request.OriginalPrice,
            request.Bedrooms,
            request.Bathrooms,
            request.Area,
            request.MaxGuests,
            request.Rating,
            request.Reviews,
            request.Featured,
            request.PropertyType);

        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(result.Value); // return the ApartmentId (Guid)
    }

    // POST api/apartments/{apartmentId}/images
    [HttpPost("{apartmentId:guid}/images")]
    public async Task<IActionResult> AddImages(
        Guid apartmentId,
        AddApartmentImagesRequest request,
        CancellationToken cancellationToken)
    {
        var command = new AddApartmentImagesCommand(apartmentId, request.ImageUrls);
        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(result.Error);

        // return created apartment id (or 204 NoContent if you prefer)
        return Ok(result.Value);
    }

    [HttpPost("{apartmentId:guid}/amenities")]
    public async Task<IActionResult> AddAmenities(
        Guid apartmentId,
        AddApartmentAmenitiesRequest request,
        CancellationToken cancellationToken)
    {
        var command = new AddApartmentAmenitiesCommand(
            apartmentId,
            request.Amenities.Select(a => new AmenityDto(a.Type, a.Included)).ToList());

        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(result.Error);

        return Ok(result.Value); // or NoContent()
    }
}
