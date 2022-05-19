namespace AspNetCoreWithReact.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly ILibraryService _libraryService;

        public LibraryController(ILibraryService libraryService) => _libraryService = libraryService;

        [HttpGet]
        public IActionResult GetAll() => Ok(_libraryService.GetAll());

        [HttpGet]
        public IActionResult Search(string name) => Ok(_libraryService.GetByName(name));

        [HttpPut]
        public IActionResult Update(Library library) => Ok(_libraryService.Update(library));

        [HttpPost]
        public IActionResult Save(Library library) => Ok(_libraryService.Save(library));

        [HttpDelete]
        public IActionResult Delete(Library library)
        {
            _libraryService.Delete(library);
            return Ok();
        }
    }
}
