namespace AspNetCoreWithReact.CustomMiddleware;

public static class MyMiddlewareExtensions
{
    public static IApplicationBuilder UseMyMiddleware(this IApplicationBuilder builder) => builder.UseMiddleware<MyMiddleware>();
}