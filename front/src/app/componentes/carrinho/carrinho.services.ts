import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private chaveArmazenamento = 'carrinho';


  getIdsSelecionados() {
    const carrinho = localStorage.getItem(this.chaveArmazenamento);
    return carrinho ? JSON.parse(carrinho) : [];
  }

  adicionarAoCarrinho(id: number) {
    const carrinho = this.getIdsSelecionados();
    carrinho.push(id);
    localStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
  }

  removerDoCarrinho(id: number) {
    const carrinho = this.getIdsSelecionados();
    carrinho.pop(id);
    localStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
  }

  excluirDoCarrinho(id: number) {
    const carrinho = this.getIdsSelecionados();

    const indices = carrinho.reduce((acc: number[], current: number, index: number) => {
      if (current === id) {
        acc.push(index);
      }
      return acc;
    }, []);

    for (let i = indices.length - 1; i >= 0; i--) {
      carrinho.splice(indices[i], 1);
    }
    localStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
  }


}
