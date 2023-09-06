import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  listaDeObjetos: any[] = [];

  fecharModalEvent: EventEmitter<void> = new EventEmitter<void>();

  fecharModal() {
    this.fecharModalEvent.emit();
  }
  
  constructor() { }
}
