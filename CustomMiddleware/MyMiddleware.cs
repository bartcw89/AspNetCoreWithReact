namespace AspNetCoreWithReact.CustomMiddleware;

public class MyMiddleware
{
    private readonly RequestDelegate _next;

    public MyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public Task Invoke(HttpContext httpContext)
    {
        httpContext.Response.Headers.Add("Author", "Victor");
        return _next(httpContext);
    }
}