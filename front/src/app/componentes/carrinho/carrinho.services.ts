import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private chaveArmazenamento = 'carrinho';

  adicionarAoCarrinho(id: number) {
    const carrinho = this.getIdsSelecionados();
    carrinho.push(id);
    localStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
  }


  getIdsSelecionados() {
    const carrinho = localStorage.getItem(this.chaveArmazenamento);
    return carrinho ? JSON.parse(carrinho) : [];
  }


}
