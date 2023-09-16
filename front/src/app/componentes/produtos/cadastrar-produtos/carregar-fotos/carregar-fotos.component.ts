import { Component, Input, OnInit } from '@angular/core';
import { ProdutosService } from '../../produtos.service';
import { ModalService } from '../modal.service';
import { CadastrarProdutosComponent } from '../cadastrar-produtos.component';
import { environment } from 'src/environments/environment';
import { CarregarFotos } from 'src/app/core/types/type';

const API = environment.apiURL;
@Component({
  selector: 'app-carregar-fotos',
  templateUrl: './carregar-fotos.component.html',
  styleUrls: ['./carregar-fotos.component.css'],
})
export class CarregarFotosComponent implements OnInit {
  
  file: File | null = null;
  preview!: string;
  imagemPrincipalId: string = '';

  @Input() fotosProduto: CarregarFotos[] = [];

  constructor(
    private produtoService: ProdutosService,
    public modalservice: ModalService,
    private cadastrarProduto: CadastrarProdutosComponent
  ) {}

  ngOnInit(): void {}

  concluirUpload() {
    this.cadastrarProduto.receberListaFotos(this.fotosProduto);
    this.modalservice.fecharModal();
  }

  cancelarUpload() {
    this.modalservice.fecharModal();
  }

  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
  }

  selecionarImagem(event: any): void {
    this.file = event.target.files[0] as File;
    if (this.file) {
      this.enviarImagem();
    }
  }

  selecionarImagemPrincipal(id: string) {
    this.fotosProduto.forEach((foto) => {
      if (foto.nomeImg === id) {
        foto.flagImg = 'p';
      } else {
        foto.flagImg = '';
      }
      foto.idProduto = 0;
    });
  }

  enviarImagem(): void {
    if (this.file) {
      this.produtoService.enviarImagem(this.file).subscribe(
        (response) => {
          this.fotosProduto.push(response);
          this.selecionarImagemPrincipal(response.nomeImg);
        },
        (error) => {
          console.error('Erro ao enviar a imagem:', error);
        }
      );
    } else {
      alert('Nenhuma imagem selecionada.');
    }
  }

}
