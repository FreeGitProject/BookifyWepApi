using Bookify.Api.Settings;

namespace Bookify.Api
{
    public static class DependencyInjection
    {
        public static WebApplicationBuilder AddCorsPolicy(this WebApplicationBuilder builder)
        {
            CorsOptions corsOptions = builder.Configuration.GetSection(CorsOptions.SectionName).Get<CorsOptions>()!;

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(CorsOptions.PolicyName, policy =>
                {
                    policy
                        .WithOrigins(corsOptions.AllowedOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            return builder;
        }
    }
}
