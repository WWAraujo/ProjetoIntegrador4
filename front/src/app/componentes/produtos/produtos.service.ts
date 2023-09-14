import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginaProdutos, Produto } from './listar-produtos/listar-produtos';
import { environment } from 'src/environments/environment';
import {
  CarregarFotos,
  ProdutoCompletoListar,
} from './cadastrar-produtos/cadastrar-produtos';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private idProduto!: number;
  constructor(private http: HttpClient) {}

  getProdutos(page: number): Observable<PaginaProdutos> {
    return this.http.get<PaginaProdutos>(`${API}/produto/listar?page=${page}`);
  }

  getProdutoCompleto(id: number): Observable<PaginaProdutos> {
    return this.http.get<PaginaProdutos>(
      `${API}/produto/mostrar-produto-completo/${id}`
    );
  }

  getProdutoAlterar(id: number): Observable<ProdutoCompletoListar> {
    return this.http.get<ProdutoCompletoListar>(
      `${API}/produto/mostrar-produto-completo/${id}`
    );
  }

  getProdutosByString(pesquisa: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API}/produto/buscarproduto/${pesquisa}`);
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post(`${API}/produto/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  enviarImagem(file: File): Observable<CarregarFotos> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<CarregarFotos>(`${API}/api/upload`, formData);
  }

  cadastrarProduto(produtoData: any): Observable<any> {
    return this.http.post(`${API}/produto/cadastrar-produto`, produtoData);
  }

  alterarProduto(produto: any) {
    return this.http.put(`${API}/produto/alterar-produto`, produto);
  }

  excluir(id: number, status: string): Observable<any> {
    const url = `${API}/produto/${id}/${status}`;
    return this.http.delete<any>(url);
  }

  getPegarId(page: number): Observable<PaginaProdutos> {
    return this.http.get<PaginaProdutos>(`${API}/produto/listar?page=${page}`);
  }

  setIdProduto(id: number) {
    this.idProduto = id;
  }

  getIdProduto(): number {
    return this.idProduto;
  }



  // deletarImagem(img: any) {
  //   return this.http.delete(`${API}/api/upload/deleteFile`, img);
  // }
}
