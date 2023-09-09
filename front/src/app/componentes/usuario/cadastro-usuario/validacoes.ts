import { AbstractControl } from '@angular/forms';

export class Validacoes {
  static ValidaCPF(controle: AbstractControl): { cpfInvalido: true } | null {
    const cpf = controle.value;

    if (!Validacoes.validaCPF(cpf)) {
      return { cpfInvalido: true };
    }

    return null;
  }

  private static validaCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
      return false; // CPF deve ter 11 dígitos
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      return false; // CPF com todos os dígitos iguais é inválido
    }

    let soma = 0;
    let resto: number;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }
}
