using Bookify.Application.Apartments.SearchApartments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookify.Application.Apartments.GetApartment
{
    public sealed class ApartmentDetailResponse
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        public AddressResponse Address { get; set; }
        public decimal PriceAmount { get; init; }
        public string PriceCurrency { get; init; }
        public decimal CleaningFeeAmount { get; init; }
        public string CleaningFeeCurrency { get; init; }
    }
}
