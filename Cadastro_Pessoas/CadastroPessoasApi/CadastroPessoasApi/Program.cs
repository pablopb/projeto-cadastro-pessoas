using CadastroPessoasApi.Data;
using CadastroPessoasApi.Dtos;
using CadastroPessoasApi.Entities;
using CadastroPessoasApi.ValueObjects;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAnyOrigin");

app.MapGet("/pessoa/{id}", async (DataContext  context, int id) =>
{
    return await context.Pessoas.FindAsync(id) is Pessoa pessoa ? Results.Ok(pessoa) : Results.NotFound();
});

app.MapGet("/pessoa/", async (DataContext context) =>
{
    var result = await context.Pessoas.OrderByDescending(x => x.Id).ToListAsync();
    return Results.Ok(result);
});

app.MapPost("/pessoa", async (DataContext  context, PessoaDto pessoaDto) =>
{
    CPF cpf = CPF.FromValue(pessoaDto.Cpf);
    if (cpf is null)
        return Results.BadRequest("CPF inválido");
    pessoaDto.Cpf = cpf.Value;
    Pessoa pessoa = pessoaDto;
    if (await context.Pessoas.FirstOrDefaultAsync(x => x.Cpf == cpf.Value) is not null)
        return Results.BadRequest("Pessoa já cadastrada");
    context.Add(pessoa);
    await context.SaveChangesAsync();
    return Results.Ok(pessoa);
});

app.MapPut("/pessoa", async (DataContext context, PessoaDto pessoaDto) =>
{
    CPF cpf = CPF.FromValue(pessoaDto.Cpf);
    Pessoa pessoa = await context.Pessoas.FindAsync(pessoaDto.Id);
    if (cpf is null)
        return Results.BadRequest("CPF inválido");
    if (pessoa is  null)
        return Results.NotFound("Pessoa não encontrada");
    pessoa.Cpf = cpf.Value;
    pessoa.Nome = pessoaDto.Nome;
    pessoa.Renda = pessoaDto.Renda;
    pessoa.DataNascimento = pessoaDto.DataNascimento;
    await context.SaveChangesAsync();
    return Results.Ok(pessoa);
});

app.MapDelete("/pessoa/{id}", async (DataContext context, int id) =>
{
    Pessoa pessoa = await context.Pessoas.FindAsync(id);
    if (pessoa is null)
        return Results.NotFound("Pessoa não encontrada");
    context.Pessoas.Remove(pessoa);
    await context.SaveChangesAsync();
    return Results.Ok();
});

app.Run();

