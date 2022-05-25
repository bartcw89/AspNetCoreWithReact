var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IConsoleWriter, ConsoleWriter>();
builder.Services.AddTransient<ILibraryService, LibraryService>();
builder.Services.AddDbContext<AppDataContext>(c => c.UseSqlServer(builder.Configuration.GetConnectionString("AspNetAndReactCourse")));
builder.Services.AddSwaggerGen(s => s.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET CORE API", Version = "v1" }));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
    app.UseHsts();
app.UseCors(options => options.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true));
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "React ASP.NET"));
app.UseRouting();
app.UseMyMiddleware();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html"); ;

app.Run();