import { EventEmitter, Injectable } from '@angular/core';
import { CarregarFotos } from 'src/app/core/types/type';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  listaDeObjetos: any[] = [];
  listaFotos: CarregarFotos[] = [];

  fecharModalEvent: EventEmitter<void> = new EventEmitter<void>();

  fecharModal() {
    this.fecharModalEvent.emit();
  }

  atualizarLitaFotos(fotos: CarregarFotos[]) {
    this.listaFotos = fotos;
  }

  getListaFotos() {
    return this.listaFotos;
  }

  constructor() {}
}
