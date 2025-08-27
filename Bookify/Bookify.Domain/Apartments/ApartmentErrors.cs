using Bookify.Domain.Abstractions;

namespace Bookify.Domain.Apartments;

public static class ApartmentErrors
{
    public static Error NotFound = new(
        "Apartment.NotFound",
        "The apartment with the specified identifier was not found");
    public static readonly Error InvalidImages = new("Apartment.InvalidImages", "Provided images are invalid.");
}