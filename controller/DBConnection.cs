using MySqlConnector;

namespace ZooAPI.controller
{
    public class DBConnection
    {
        public MySqlConnection Connection { get; }

        public DBConnection(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
        }

        public async Task OpenConnectionAsync()
        {
            await Connection.OpenAsync();
        }

        public async Task CloseConnectionAsync()
        {
            await Connection.CloseAsync();
        }
    }
}