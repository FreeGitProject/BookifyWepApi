using Bookify.Domain.Apartments;
using Dapper;
using System.Data;

namespace Bookify.Infrastructure.Data.TypeHandlers
{
    public class AmenityListTypeHandler : SqlMapper.TypeHandler<List<Amenity>>
    {
        public override List<Amenity> Parse(object value)
        {
            if (value is int[] intArray)
            {
                return intArray.Select(x => (Amenity)x).ToList();
            }

            return new List<Amenity>();
        }

        public override void SetValue(IDbDataParameter parameter, List<Amenity> value)
        {
            parameter.Value = value?.Select(x => (int)x).ToArray();
        }
    }
}