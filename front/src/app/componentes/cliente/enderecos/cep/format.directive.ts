import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepFormat]'
})
export class FormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let inputValue = inputElement.value;

    // Remove todos os caracteres não numéricos
    inputValue = inputValue.replace(/\D/g, '');

    // Formata o CEP (12345-678)
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5) + '' + inputValue.slice(5);
    }

    // Limita a 8 caracteres
    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }

    // Define o valor formatado de volta no campo
    inputElement.value = inputValue;
  }

}
