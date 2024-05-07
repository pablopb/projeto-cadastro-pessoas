using System.Text.RegularExpressions;

namespace CadastroPessoasApi.ValueObjects
{
    public sealed class CPF
    {
        public string Value { get; private set; }

        private CPF(string value) {
            Value = value;
        }

        public static CPF? FromValue(string value)
        {
            if (IsValid(value))
            {
                return new CPF(Format(value));   
            }
            return null;
        }

        private static bool IsValid(string cpf)
        {
            if (string.IsNullOrWhiteSpace(cpf))
                return false;
            cpf = Format(cpf);

            if(!IsNumeric(cpf))
                return false;

            if (cpf.Length != 11)
                return false;

            bool isEqual = true;
            for (int i = 1; i < 11 && isEqual; i++)
            {
                if (cpf[i] != cpf[0])
                {
                    isEqual = false;
                }
            }

            if (isEqual || cpf == "12345678909")
                return false;

            int[] multiplierFirstDigit = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplierSecondDigit = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };

            string tempCpf = cpf.Substring(0, 9);
            int sum = 0;

            for (int i = 0; i < 9; i++)
            {
                sum += int.Parse(tempCpf[i].ToString()) * multiplierFirstDigit[i];
            }

            int remainder = sum % 11;
            int firstDigit = remainder < 2 ? 0 : 11 - remainder;

            if (cpf[9] != firstDigit.ToString()[0])
            {
                return false;
            }

            sum = 0;
            tempCpf = cpf.Substring(0, 10);

            for (int i = 0; i < 10; i++)
            {
                sum += int.Parse(tempCpf[i].ToString()) * multiplierSecondDigit[i];
            }

            remainder = sum % 11;
            int secondDigit = remainder < 2 ? 0 : 11 - remainder;

            return cpf[10] == secondDigit.ToString()[0];
        }

        private static bool IsNumeric(string cpf) => Regex.IsMatch(cpf, @"^\d+$");
       

        private static string Format(string cpf) => cpf.Replace(".", "").Replace("-", "").Trim();
    }
}
