using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Endpoints;

public static class TodoListEndpoints
{
    public static void AddTodoListEndpoints(this WebApplication app)
    {
        app.MapGet("/TodoLists", async (AppDbContext context) =>
        {
            try
            {
                var results = await context.TodoLists.OrderByDescending(i => i.Id).ToListAsync();
                return Results.Ok(results);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });

        app.MapPost("/TodoLists", async (TodoList dto, AppDbContext context) =>
        {
            try
            {
                var todolist = new TodoList { Name = dto.Name };
                await context.TodoLists.AddAsync(todolist);
                await context.SaveChangesAsync();
                return Results.Created($"/TodoLists/{todolist.Id}", todolist);
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        });

        app.MapDelete("/TodoLists/{id:int}", async (int id, AppDbContext context) =>
        {
            try
            {
                var todoList = await context.TodoLists.FirstOrDefaultAsync(l => l.Id == id);
                if (todoList == null) return Results.NotFound();
                context.TodoLists.Remove(todoList);
                await context.SaveChangesAsync();
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.Problem(e.Message);
            }
        });
    }
}