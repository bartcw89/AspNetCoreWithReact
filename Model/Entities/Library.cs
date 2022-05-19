namespace AspNetCoreWithReact.Model.Entities;

[Table("Library")]
public class Library
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Address { get; set; }
    public string Telephone { get; set; }
}
