using CadastroPessoasApi.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CadastroPessoasApi.Entities
{
    public class Pessoa
    {
        public Pessoa(string nome, DateOnly dataNascimento, decimal renda, string cpf)
        {
            Nome = nome;
            DataNascimento = dataNascimento;
            Renda = renda;
            Cpf = cpf;
        }

        public Pessoa(int id, string nome, DateOnly dataNascimento, decimal renda, string cpf)
        {
            Id = id;
            Nome = nome;
            DataNascimento = dataNascimento;
            Renda = renda;
            Cpf = cpf;
        }

        public int Id { get; set; }

        public string Nome { get; set; }

        public DateOnly DataNascimento { get; set; }

        public decimal Renda { get; set; }
        public string Cpf { get; set; }

        public static implicit operator Pessoa(PessoaDto dto) => new Pessoa(dto.Id, dto.Nome, dto.DataNascimento, dto.Renda, dto.Cpf);
    }
}
