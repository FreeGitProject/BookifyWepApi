using Bookify.Domain.Abstractions;
using MediatR;

namespace Bookify.Application.Abstractions.Messaging
{
    public interface ICommandHandler<TCommand> : IRequestHandler<TCommand,Result>
        where TCommand : ICommand
    {
    }   
    public interface ICommandHandler<TCommand,TReponse> : IRequestHandler<TCommand,Result<TReponse>>
        where TCommand : ICommand<TReponse>
    {
    }
}
