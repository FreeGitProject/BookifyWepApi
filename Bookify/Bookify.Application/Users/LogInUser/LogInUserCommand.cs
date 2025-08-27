using Bookify.Application.Abstractions.Messaging;
using Bookify.Application.Users.RegisterUser;

namespace Bookify.Application.Users.LogInUser;

public sealed record LogInUserCommand(string Email, string Password)
    : ICommand<AccessTokenResponse>;
