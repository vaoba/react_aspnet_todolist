using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Endpoints;

public static class TodoItemEndpoints
{
    public static void AddTodoItemEndpoints(this WebApplication app)
    {
        app.MapGet("/TodoLists/{id:int}", async (int id, AppDbContext context) =>
        {
            try
            {
                var result = await context.TodoItems.Where(i => i.ListId == id).OrderByDescending(i => i.Id).ToListAsync();
                return Results.Ok(result);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });

        app.MapPost("/TodoLists/{id:int}", async (int id, TodoItem dto, AppDbContext context) =>
        {
            try
            {
                var todoItem = new TodoItem { Name = dto.Name, ListId = id, IsComplete = false };
                await context.TodoItems.AddAsync(todoItem);
                await context.SaveChangesAsync();
                return Results.Created("/TodoLists/" + id, todoItem);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });

        app.MapPut("/TodoLists/{id:int}", async (int id, TodoItem dto, AppDbContext context) =>
        {
            try
            {
                var todoItem = await context.TodoItems.Where(i => i.ListId == id && i.Id == dto.Id).SingleOrDefaultAsync();
                if (todoItem == null) throw new Exception("TodoItem not found");
                
                todoItem.IsComplete = dto.IsComplete;
                await context.SaveChangesAsync();
                return Results.Accepted("/TodoLists/" + id, todoItem);
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });

        app.MapDelete("/TodoLists/{id:int}/Clean", async (int id, AppDbContext context) =>
        {
            try
            {
                await context.TodoItems.Where(i => i.ListId == id && i.IsComplete).ExecuteDeleteAsync();
                return Results.Ok();
            }
            catch (Exception e)
            {
                return Results.BadRequest(e.Message);
            }
        });
    }
}