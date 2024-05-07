namespace CadastroPessoasApi.Dtos
{
    public class SearchResultDto
    {
        public SearchResultDto(int count, IEnumerable<object> result)
        {
            Count = count;
            Result = result;
        }

        public int Count { get; private set; }

        public IEnumerable<Object> Result { get; private set; }
    }
}
