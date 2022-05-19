namespace AspNetCoreWithReact;

public class AppDataContext : DbContext
{
    public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) {}

    public DbSet<Library> Libraries { get; set; }
}