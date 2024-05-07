global using Microsoft.EntityFrameworkCore;
using CadastroPessoasApi.Entities;

namespace CadastroPessoasApi.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                base.OnConfiguring(optionsBuilder);
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                string connectionString = configuration.GetConnectionString("CadastroPessoaConnectionString");

                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        public DbSet<Pessoa> Pessoas => Set<Pessoa>();
    }
}
