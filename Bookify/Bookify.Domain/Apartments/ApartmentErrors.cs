using Bookify.Domain.Abstractions;

namespace Bookify.Domain.Apartments;

public static class ApartmentErrors
{
    public static Error NotFound = new(
        "Apartment.NotFound",
        "The apartment with the specified identifier was not found");

    public static readonly Error InvalidBedrooms = new(
       "Apartment.InvalidBedrooms",
       "Number of bedrooms must be greater than 0");

    public static readonly Error InvalidBathrooms = new(
        "Apartment.InvalidBathrooms",
        "Number of bathrooms must be greater than 0");

    public static readonly Error InvalidSize = new(
        "Apartment.InvalidSize",
        "Size must be greater than 0");

    public static readonly Error InvalidFloor = new(
        "Apartment.InvalidFloor",
        "Floor cannot be negative");

    public static readonly Error InvalidMaxGuests = new(
        "Apartment.InvalidMaxGuests",
        "Maximum guests must be greater than 0");

    public static readonly Error AtLeastOneImageRequired = new(
        "Apartment.AtLeastOneImageRequired",
        "At least one image is required");
}