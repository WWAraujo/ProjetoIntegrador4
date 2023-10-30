import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Endereco } from 'src/app/core/types/type';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {

  private telaParaExibir: string = 'carrinho';
  private chaveArmazenamento = 'carrinho';
  private subtotal: number = 0;
  private numeroParcelas: number = 0;
  private frete: number = 0;
  private formaPagamento: string = '';
  private enderecoSelecionado!: Endereco;
  private loggedIn = new BehaviorSubject<boolean>(false);

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
    const index = carrinho.indexOf(id);

    if (index !== -1) {
      carrinho.splice(index, 1);
    }
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

  getSubtotal(): number {
    return this.subtotal;
  }

  setSubtotal(subtotal: number): void {
    this.subtotal = subtotal;
  }

  getNumeroParcelas(): number{
    return this.numeroParcelas;
  }

  setNumeroParcelas( numeroParcelas: number): void {
    this.numeroParcelas = numeroParcelas;
  }

  getValorFrete() {
    return this.frete;
  }

  setValorFrete(valor: number): void {
    this.frete = valor;
  }

  getFormaDePagamento(){
    return this.formaPagamento;

  }

  setFormaDePagamento(formaPagamento: string){
    this.formaPagamento = formaPagamento;
  }

  getEndereco(){
    return this.enderecoSelecionado;
  }

  setEndereco(endereco: Endereco){
    this.enderecoSelecionado = endereco;
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setTrocarTelaCarrinho() {
    this.telaParaExibir = 'carrinho';
  }

  setTrocarTelaEndereco() {
    this.telaParaExibir = 'endereco';
  }

  setTrocarTelaFormaPagamento() {
    this.telaParaExibir = 'pagamento';
  }

  setTrocarTelaConfirmacao() {
    this.telaParaExibir = 'confirmacao';
  }

  setTrocarTelaConcluir() {
    this.telaParaExibir = 'concluir';
  }

  getTelaCarrinho(){
    return this.telaParaExibir;
  }
}
