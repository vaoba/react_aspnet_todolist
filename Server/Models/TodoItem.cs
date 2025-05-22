namespace Server.Models;

public class TodoItem
{
    public int Id { get; init; }
    public int ListId { get; init; }
    public string Name { get; init; } = string.Empty;
    public bool IsComplete { get; set; }
}