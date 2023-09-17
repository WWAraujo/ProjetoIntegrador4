import { Component, OnInit } from '@angular/core';
import { Produto } from '../../produtos/visualizar-produtos-cadastrados/visualizar-produtos-cadastrados';
import { ProdutosService } from '../../produtos/produtos.service';

@Component({
  selector: 'app-produto-detalhado',
  templateUrl: './produto-detalhado.component.html',
  styleUrls: ['./produto-detalhado.component.css']
})
export class ProdutoDetalhadoComponent implements OnInit {

  imagemPrincipal!: string;
  productData: any = {};
  idProduto!: number;
  produtos: Produto[] = [];
  ativoInativo!: string;
  semEstoque: number = 0;
  produtoIndisponivel: boolean = false;
  imagensSecundarias: string[] = [];
  botaoDesabilitado: boolean = false;
  exibirCabecalho: boolean = true;

  constructor(private service: ProdutosService) { }

  ngOnInit(): void {
    this.idProduto = this.service.getIdProduto()
    this.service.getProdutoCompleto(this.idProduto).subscribe(data => {
      this.productData = data;
      console.log(data);

      const primeiraImagemPrincipal = this.productData.fotosProdutoRecord.find(
        (foto: { flagImg: string; }) => foto.flagImg === 'p'
      );

      if (primeiraImagemPrincipal) {
        this.imagemPrincipal = this.getFullPath(primeiraImagemPrincipal.nomeImg);
      }

      this.ativoInativo = this.productData.produto.ativoInativo;
      this.semEstoque = this.productData.produto.qtdEstoque;
      console.log('Valor de estoque:', this.semEstoque);
      if (this.ativoInativo === 'INATIVO' || this.semEstoque == 0) {
        this.produtoIndisponivel = true;

      } else {
        this.produtoIndisponivel = false;

      }

      this.imagensSecundarias = this.productData.fotosProdutoRecord
        .filter((foto: { flagImg: string; }) => foto.flagImg !== 'p')
        .map((foto: { nomeImg: string; }) => this.getFullPath(foto.nomeImg));

    })
  }

  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }

  trocarImagemPrincipal(novaImagem: string): void {
    this.imagemPrincipal = novaImagem;
  }


  habilitarBotao(): string {
    if (this.botaoDesabilitado) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
