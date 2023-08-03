using MySqlConnector;
using ZooAPI.model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ZooAPI.controller
{
    public class Besucher
    {
        private DBConnection _dbConnection;

        public Besucher(DBConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<List<Animal>> GetAllAnimalsAsync()
        {
            var animals = new List<Animal>();

            using (var command = _dbConnection.Connection.CreateCommand())
            {
                command.CommandText = "SELECT * FROM tiere;";
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var animal = new Animal
                        {
                            Id = reader.GetInt32(0),
                            tierName = reader.GetString(1),
                            Nahrung = reader.GetString(2),
                            GehegeId = reader.GetInt32(3)
                        };
                        animals.Add(animal);
                    }
                }
            }

            return animals;
        }
    }
}