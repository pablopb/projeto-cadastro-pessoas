namespace CadastroPessoasApi.Dtos
{
    public class PessoaDto { 
        public int Id { get; set; }

        public string Nome { get; set; }

        public DateOnly DataNascimento { get; set; }

        public string Cpf { get; set; }

        public decimal Renda { get; set; }
    }
}
