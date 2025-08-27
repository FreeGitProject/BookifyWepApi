using FluentValidation;

namespace Bookify.Application.Users.LogInUser;

internal sealed class LogInUserCommandValidator : AbstractValidator<LogInUserCommand>
{
    public LogInUserCommandValidator()
    {
        RuleFor(c => c.Email).EmailAddress();

        RuleFor(c => c.Password).NotEmpty().MinimumLength(5);
    }
}