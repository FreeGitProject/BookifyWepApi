namespace Bookify.Api.Settings
{
    public sealed class CorsOptions
    {
        public const string PolicyName = "BookifyCorsPolicy";
        public const string SectionName = "Cors";

        public required string[] AllowedOrigins { get; init; }
    }
}
