import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'usuario' })
export class UserPipe implements PipeTransform {
  transform(value: Array<any>, filtro: string): any {
    if (filtro) {
      filtro = filtro.toUpperCase();

      return value.filter((a) => a.nome.toUppercase().indexOf(filtro) >= 0);
    } else {
      return value;
    }
  }
}
