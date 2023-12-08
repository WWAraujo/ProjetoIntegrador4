import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';
import { Endereco, FormaPagamento, Venda } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CarrinhoServices {

  private telaParaExibir: string = 'carrinho';
  private chaveArmazenamento = 'carrinho';
  private subtotal: number = 0;
  private numeroParcelas: number = 0;
  private frete: number = 0;
  private prazoEntrega: string = '';
  private formaPagamento: string = '';
  private enderecoSelecionado!: Endereco;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private mostrarResumo: boolean = false;
  private mostrarEndereco: boolean = false;
  private mostrarConcluir: boolean = false;
  private mostrarFormaPagamento: boolean = false;
  private formaPagamentoCompleto!: FormaPagamento;
  private idVendaSalvaBanco: number = 0;

  constructor() {}

  getIdVendaSalvaBanco(){
    return this.idVendaSalvaBanco;
  }
  setIdVendaSalvaBanco(id: number){
    this.idVendaSalvaBanco = id;
  }

  getFormaPagamentoCompleto(){
    return this.formaPagamentoCompleto;
  }
  setFormaPagamentoCompleto(form: FormaPagamento){
    this.formaPagamentoCompleto = form;
  }

  getMostrarEndereco() {
    return this.mostrarEndereco;
  }
  setMostrarEndereco(status: boolean) {
    this.mostrarEndereco = status;
  }

  getMostrarFormaPagamento() {
    return this.mostrarFormaPagamento;
  }
  setMostrarFormaPagamento(status: boolean) {
    this.mostrarFormaPagamento = status;
  }

  getMostrarResumo() {
    return this.mostrarResumo;
  }
  setMostrarResumo(status: boolean) {
    this.mostrarResumo = status;
  }

  getMostrarConcluir() {
    return this.mostrarConcluir;
  }

  setMostrarConcluir(status: boolean) {
    this.mostrarConcluir = status;
  }

  getPrazoEntrega() {
    return this.prazoEntrega;
  }

  setPrazoEntrega(prazo: string) {
    this.prazoEntrega = prazo;
  }

  getIdsSelecionados() {
    const carrinho = sessionStorage.getItem(this.chaveArmazenamento);
    return carrinho ? JSON.parse(carrinho) : [];
  }

  adicionarAoCarrinho(id: number) {
    const carrinho = this.getIdsSelecionados();
    carrinho.push(id);
    sessionStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
  }

  removerDoCarrinho(id: number) {
    const carrinho = this.getIdsSelecionados();
    const index = carrinho.indexOf(id);

    if (index !== -1) {
      carrinho.splice(index, 1);
    }
    sessionStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
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
    sessionStorage.setItem(this.chaveArmazenamento, JSON.stringify(carrinho));
  }

  limparCarrinho(){
    sessionStorage.removeItem(this.chaveArmazenamento);
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

  setTrocarTelaConcluir(){
    this.telaParaExibir = 'concluir';
  }

  setTrocarTelaListarPedidos() {
    this.telaParaExibir = 'listar-pedidos';
  }

  getTelaCarrinho(){
    return this.telaParaExibir;
  }

  getIdCliente():number{
    return this.idVendaSalvaBanco;
  }

  setIdCliente(id: number){
    this.idVendaSalvaBanco = id;
  }
}
