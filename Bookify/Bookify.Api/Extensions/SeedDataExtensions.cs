using Bogus;
using Bookify.Application.Abstractions.Data;
using Bookify.Domain.Apartments;
using Dapper;

namespace Bookify.Api.Extensions;

public static class SeedDataExtensions
{
    public static void SeedData(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();

        var sqlConnectionFactory = scope.ServiceProvider.GetRequiredService<ISqlConnectionFactory>();
        using var connection = sqlConnectionFactory.CreateConnection();

        var faker = new Faker();

        List<object> apartments = new();
        for (var i = 0; i < 100; i++)
        {
            var rating = faker.Random.Decimal(3, 5);
            var reviews = faker.Random.Int(5, 500);

            apartments.Add(new
            {
                Id = Guid.NewGuid(),
                Name = faker.Company.CompanyName(),
                Description = faker.Lorem.Paragraph(),
                Address_Country = faker.Address.Country(),
                Address_State = faker.Address.State(),
                Address_ZipCode = faker.Address.ZipCode(),
                Address_City = faker.Address.City(),
                Address_Street = faker.Address.StreetAddress(),
                Price_Amount = faker.Random.Decimal(50, 1000),
                Price_Currency = "USD",
                CleaningFee_Amount = faker.Random.Decimal(25, 200),
                CleaningFee_Currency = "USD",
                OriginalPrice_Amount = faker.Random.Decimal(60, 1100),
                OriginalPrice_Currency = "USD",
                Bedrooms = faker.Random.Int(1, 5),
                Bathrooms = faker.Random.Int(1, 3),
                Area = faker.Random.Int(500, 3000),
                MaxGuests = faker.Random.Int(2, 10),
                Rating = Math.Round(rating, 2),
                Reviews = reviews,
                Featured = faker.Random.Bool(0.2f), // 20% chance of being featured
                PropertyType = faker.PickRandom<PropertyType>(),
                Host_Name = faker.Name.FullName(),
                Host_AvatarUrl = faker.Internet.Avatar(),
                Host_Rating = Math.Round(faker.Random.Decimal(4, 5), 2),
                Host_Reviews = faker.Random.Int(10, 300),
                Host_Verified = faker.Random.Bool(0.8f), // 80% chance of being verified
                Host_ResponseTime = faker.PickRandom("Within an hour", "Within a few hours", "Within a day"),
                Policies_CheckIn = "3:00 PM",
                Policies_CheckOut = "11:00 AM",
                Policies_MinStay = faker.Random.Int(1, 3),
                Policies_Cancellation = faker.PickRandom("Flexible", "Moderate", "Strict")
            });
        }

        const string sql = """
            INSERT INTO public.apartments
            (id, "name", description, 
             address_country, address_state, address_zip_code, address_city, address_street,
             price_amount, price_currency, 
             cleaning_fee_amount, cleaning_fee_currency,
             original_price_amount, original_price_currency,
             bedrooms, bathrooms, area, max_guests, rating, reviews, featured, property_type,
             host_name, host_avatar_url, host_rating, host_reviews, host_verified, host_response_time,
             policies_check_in, policies_check_out, policies_min_stay, policies_cancellation
             )
            VALUES(@Id, @Name, @Description, 
                   @Address_Country, @Address_State, @Address_ZipCode, @Address_City, @Address_Street,
                   @Price_Amount, @Price_Currency,
                   @CleaningFee_Amount, @CleaningFee_Currency,
                   @OriginalPrice_Amount, @OriginalPrice_Currency,
                   @Bedrooms, @Bathrooms, @Area, @MaxGuests, @Rating, @Reviews, @Featured, @PropertyType,
                   @Host_Name, @Host_AvatarUrl, @Host_Rating, @Host_Reviews, @Host_Verified, @Host_ResponseTime,
                   @Policies_CheckIn, @Policies_CheckOut, @Policies_MinStay, @Policies_Cancellation
                   );
            """;

        connection.Execute(sql, apartments);
    }
}
