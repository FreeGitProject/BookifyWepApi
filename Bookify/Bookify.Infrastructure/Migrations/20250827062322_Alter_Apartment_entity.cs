using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Bookify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Alter_Apartment_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "amenities",
                table: "apartments");

            migrationBuilder.AddColumn<int>(
                name: "area",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "bathrooms",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "bedrooms",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "featured",
                table: "apartments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "host_avatar_url",
                table: "apartments",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "host_name",
                table: "apartments",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "host_rating",
                table: "apartments",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "host_response_time",
                table: "apartments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "host_reviews",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "host_verified",
                table: "apartments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "max_guests",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "original_price_amount",
                table: "apartments",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "original_price_currency",
                table: "apartments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "policies_cancellation",
                table: "apartments",
                type: "character varying(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "policies_check_in",
                table: "apartments",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "policies_check_out",
                table: "apartments",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "policies_min_stay",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "property_type",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "rating",
                table: "apartments",
                type: "numeric(3,2)",
                precision: 3,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "reviews",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "apartment_amenities",
                columns: table => new
                {
                    apartment_id = table.Column<Guid>(type: "uuid", nullable: false),
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    type = table.Column<int>(type: "integer", nullable: false),
                    included = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apartment_amenities", x => new { x.apartment_id, x.id });
                    table.ForeignKey(
                        name: "fk_apartment_amenities_apartments_apartment_id",
                        column: x => x.apartment_id,
                        principalTable: "apartments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "apartment_images",
                columns: table => new
                {
                    apartment_id = table.Column<Guid>(type: "uuid", nullable: false),
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apartment_images", x => new { x.apartment_id, x.id });
                    table.ForeignKey(
                        name: "fk_apartment_images_apartments_apartment_id",
                        column: x => x.apartment_id,
                        principalTable: "apartments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "apartment_nearby_places",
                columns: table => new
                {
                    apartment_id = table.Column<Guid>(type: "uuid", nullable: false),
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    distance = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_apartment_nearby_places", x => new { x.apartment_id, x.id });
                    table.ForeignKey(
                        name: "fk_apartment_nearby_places_apartments_apartment_id",
                        column: x => x.apartment_id,
                        principalTable: "apartments",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "apartment_amenities");

            migrationBuilder.DropTable(
                name: "apartment_images");

            migrationBuilder.DropTable(
                name: "apartment_nearby_places");

            migrationBuilder.DropColumn(
                name: "area",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "bathrooms",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "bedrooms",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "featured",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "host_avatar_url",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "host_name",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "host_rating",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "host_response_time",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "host_reviews",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "host_verified",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "max_guests",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "original_price_amount",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "original_price_currency",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "policies_cancellation",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "policies_check_in",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "policies_check_out",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "policies_min_stay",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "property_type",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "rating",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "reviews",
                table: "apartments");

            migrationBuilder.AddColumn<int[]>(
                name: "amenities",
                table: "apartments",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);
        }
    }
}
