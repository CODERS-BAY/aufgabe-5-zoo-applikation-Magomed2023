namespace ZooAPI.model
{
    public class Animal : IComparable<Animal>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public int Age { get; set; }
        public string tierName { get; set; }
        public string Nahrung { get; set; }
        public int GehegeId { get; set; }

        public int CompareTo(Animal other)
        {
            if (other == null) return 1;

            return Name.CompareTo(other.Name);
        }

        public override bool Equals(object obj)
        {
            if (obj == null || !(obj is Animal other))
            {
                return false;
            }

            return Id == other.Id;
        }

        public override int GetHashCode()
        {
            return Id;
        }

        public override string ToString()
        {
            return $"Id: {Id}, Name: {Name}, Species: {Species}, Age: {Age}";
        }
    }
}