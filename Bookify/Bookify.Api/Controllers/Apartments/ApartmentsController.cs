using Asp.Versioning;
using Bookify.Application.Apartments.SearchApartments;
using Bookify.Application.Apartments.CreateApartment;
using Bookify.Application.Apartments.UpdateApartment;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Bookify.Application.Apartments.GetApartment;
using Bookify.Domain.Apartments;
using Bookify.Domain.Shared;

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
    public async Task<IActionResult> GetApartmentById(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetApartmentByIdQuery(id);
        var result = await _sender.Send(query, cancellationToken);

        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }


    [HttpPost]
    public async Task<IActionResult> CreateApartment(
        CreateApartmentRequest request,
        CancellationToken cancellationToken)
    {
        var address = new Address(request.Address.Country, request.Address.State, request.Address.ZipCode, request.Address.City, request.Address.Street);
        var price = new Money(request.Price.Amount, Currency.FromCode(request.Price.Currency));
        var cleaningFee = new Money(request.CleaningFee.Amount, Currency.FromCode(request.CleaningFee.Currency));

        var command = new CreateApartmentCommand(
            Guid.NewGuid(),
            request.Name,
            request.Description,
            address,
            price,
            cleaningFee,
            request.Amenities.Select(a => (Amenity)a).ToList()
        );


        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return CreatedAtAction(nameof(SearchApartments), new { id = result.Value }, result.Value);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateApartment(
        Guid id,
        UpdateApartmentRequest request,
        CancellationToken cancellationToken)
    {
        var command = new UpdateApartmentCommand(
            id,
            request.Name,
            request.Description,
            request.Address,
            request.Price,
            request.CleaningFee,
            request.Amenities
        );

        var result = await _sender.Send(command, cancellationToken);

        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return NoContent();
    }
}
