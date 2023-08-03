using ZooAPI.controller;
using ZooAPI.model;
using MySqlConnector;
using System;

namespace ZooAPI
{
    class Program
    {
        static async Task Main()
        {
            var builder = new MySqlConnectionStringBuilder
            {
                Server = "192.168.115.128",
                Database = "Zoo",
                UserID = "mariadb",
                Password = "mariadb",
                SslMode = MySqlSslMode.Disabled,
                
            };

            var dbConnection = new DBConnection(builder.ConnectionString);

            Console.WriteLine("Opening Connection");
            await dbConnection.OpenConnectionAsync();

            var besucherController = new Besucher(dbConnection);
            var animals = await besucherController.GetAllAnimalsAsync();

            foreach (var animal in animals)
            {
                Console.WriteLine($"ID: {animal.Id}, tierName: {animal.tierName}, Nahrung: {animal.Nahrung}, GehegeId: {animal.GehegeId}");
            }

            Console.WriteLine("Closing Connection");
            await dbConnection.CloseConnectionAsync();

            Console.WriteLine("Press return to exit");
            Console.ReadLine();
        }
    }
}