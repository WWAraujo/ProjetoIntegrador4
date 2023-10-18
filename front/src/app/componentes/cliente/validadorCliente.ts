import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nomeClienteValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value as string;
    if (value) {
      const words = value.trim().split(' ');
      const validWords = words.filter(word => word.length >= 3);

      if (words.length === 2 && validWords.length === 2) {
        return null; // A validação passou, não há erros.
      }
    }
    return { 'nomeCliente': true }; // Retorna um erro personalizado se a validação falhar.
  };
}
