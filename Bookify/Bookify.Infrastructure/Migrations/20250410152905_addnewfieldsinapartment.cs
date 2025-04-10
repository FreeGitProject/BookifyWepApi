using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bookify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addnewfieldsinapartment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<int>(
                name: "floor",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "has_air_conditioning",
                table: "apartments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "has_balcony",
                table: "apartments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "has_heating",
                table: "apartments",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "has_parking",
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
                name: "size",
                table: "apartments",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "type",
                table: "apartments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bathrooms",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "bedrooms",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "floor",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "has_air_conditioning",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "has_balcony",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "has_heating",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "has_parking",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "max_guests",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "size",
                table: "apartments");

            migrationBuilder.DropColumn(
                name: "type",
                table: "apartments");
        }
    }
}
