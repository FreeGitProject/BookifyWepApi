namespace Bookify.Api.Controllers.Apartments
{
    public sealed record MoneyRequest(
        decimal Amount,
        string Currency);

}
