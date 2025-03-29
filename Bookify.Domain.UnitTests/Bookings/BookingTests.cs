using Bookify.Domain.Apartments;
using Bookify.Domain.Bookings;
using Bookify.Domain.Bookings.Events;
using Bookify.Domain.Shared;
using Bookify.Domain.UnitTests.Apartments;
using Bookify.Domain.UnitTests.Infrastructure;
using Bookify.Domain.UnitTests.Users;
using Bookify.Domain.Users;
using FluentAssertions;

namespace Bookify.Domain.UnitTests.Bookings;

public class BookingTests : BaseTest
{
    [Fact]
    public void Reserve_Should_RaiseBookingReservedDomainEvent()
    {
        // Arrange
        var user = User.Create(UserData.FirstName, UserData.LastName, UserData.Email);
        var price = new Money(10.0m, Currency.Usd);
        var duration = DateRange.Create(new DateOnly(2024, 1, 1), new DateOnly(2024, 1, 10));
        Apartment apartment = ApartmentData.Create(price);
        var pricingService = new PricingService();

        // Act
        var booking = Booking.Reserve(apartment, user.Id, duration, DateTime.UtcNow, pricingService);

        // Assert
        BookingReservedDomainEvent bookingReservedDomainEvent = AssertDomainEventWasPublished<BookingReservedDomainEvent>(booking);

        bookingReservedDomainEvent.BookingId.Should().Be(booking.Id);

    }
    [Fact]
    public void Confirm_Should_SetStatusToConfirmed_And_RaiseDomainEvent()
    {
        // Arrange
        var booking = CreateReservedBooking();
        var utcNow = DateTime.UtcNow;

        // Act
        var result = booking.Confirm(utcNow);

        // Assert
        result.IsSuccess.Should().BeTrue();
        booking.Status.Should().Be(BookingStatus.Confirmed);
        booking.ConfirmedOnUtc.Should().Be(utcNow);
        AssertDomainEventWasPublished<BookingConfirmedDomainEvent>(booking);
    }

    [Fact]
    public void Confirm_Should_Fail_If_NotReserved()
    {
        // Arrange
        var booking = CreateConfirmedBooking();

        // Act
        var result = booking.Confirm(DateTime.UtcNow);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be(BookingErrors.NotReserved);
    }

    [Fact]
    public void Reject_Should_SetStatusToRejected_And_RaiseDomainEvent()
    {
        // Arrange
        var booking = CreateReservedBooking();
        var utcNow = DateTime.UtcNow;

        // Act
        var result = booking.Reject(utcNow);

        // Assert
        result.IsSuccess.Should().BeTrue();
        booking.Status.Should().Be(BookingStatus.Rejected);
        booking.RejectedOnUtc.Should().Be(utcNow);
        AssertDomainEventWasPublished<BookingRejectedDomainEvent>(booking);
    }

    [Fact]
    public void Reject_Should_Fail_If_NotReserved()
    {
        // Arrange
        var booking = CreateConfirmedBooking();

        // Act
        var result = booking.Reject(DateTime.UtcNow);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be(BookingErrors.NotReserved);
    }

    [Fact]
    public void Complete_Should_SetStatusToCompleted_And_RaiseDomainEvent()
    {
        // Arrange
        var booking = CreateConfirmedBooking();
        var utcNow = DateTime.UtcNow;

        // Act
        var result = booking.Complete(utcNow);

        // Assert
        result.IsSuccess.Should().BeTrue();
        booking.Status.Should().Be(BookingStatus.Completed);
        booking.CompletedOnUtc.Should().Be(utcNow);
        AssertDomainEventWasPublished<BookingCompletedDomainEvent>(booking);
    }

    [Fact]
    public void Complete_Should_Fail_If_NotConfirmed()
    {
        // Arrange
        var booking = CreateReservedBooking();

        // Act
        var result = booking.Complete(DateTime.UtcNow);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be(BookingErrors.NotConfirmed);
    }

    [Fact]
    public void Cancel_Should_SetStatusToCancelled_And_RaiseDomainEvent()
    {
        // Arrange
        var booking = CreateConfirmedBooking();
        var utcNow = DateTime.UtcNow;

        // Act
        var result = booking.Cancel(utcNow);

        // Assert
        result.IsSuccess.Should().BeTrue();
        booking.Status.Should().Be(BookingStatus.Cancelled);
        booking.CancelledOnUtc.Should().Be(utcNow);
        AssertDomainEventWasPublished<BookingCancelledDomainEvent>(booking);
    }

    [Fact]
    public void Cancel_Should_Fail_If_BookingAlreadyStarted()
    {
        // Arrange
        var booking = CreateConfirmedBooking(DateTime.UtcNow.AddDays(-1));

        // Act
        var result = booking.Cancel(DateTime.UtcNow);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Be(BookingErrors.AlreadyStarted);
    }

    private Booking CreateReservedBooking()
    {
        var price = new Money(10.0m, Currency.Usd);
        var duration = DateRange.Create(DateOnly.FromDateTime(DateTime.UtcNow), DateOnly.FromDateTime(DateTime.UtcNow.AddDays(5)));
        var apartment = ApartmentData.Create(price);
        var pricingService = new PricingService();

        return Booking.Reserve(apartment, Guid.NewGuid(), duration, DateTime.UtcNow, pricingService);
    }

    private Booking CreateConfirmedBooking(DateTime? startDate = null)
    {
        var booking = CreateReservedBooking();
        booking.Confirm(DateTime.UtcNow);
        return booking;
    }
}
