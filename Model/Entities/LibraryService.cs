namespace AspNetCoreWithReact.Model.Entities;

public class LibraryService : ILibraryService
{
    private AppDataContext _context;

    public AppDataContext Context { get => _context; set => _context = value; }

    public LibraryService(AppDataContext appDataContext) => _context = appDataContext;

    public List<Library> GetAll() => _context.Libraries.ToList();

    public List<Library> GetByName(string name)
    {
        var linq = from libraries in _context.Libraries select libraries;
        if (!string.IsNullOrWhiteSpace(name))
            linq = linq.Where(l => l.Name.ToUpper().Contains(name.ToUpper()));
        return linq.ToList();
    }

    public Library Save(Library library)
    {
        _context.Libraries.Add(library);
        _context.SaveChanges();
        return library;
    }

    public Library Update(Library library)
    {
        var currentLibrary = _context.Libraries.First(l => l.Id == library.Id);
        _context.Entry(currentLibrary).CurrentValues.SetValues(library);
        Context.SaveChanges();
        return library;
    }

    public void Delete(Library library) 
    {
        _context.Entry(library).State = EntityState.Deleted;
        _context.SaveChanges();
    }
}
