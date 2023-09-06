import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../../produtos.service';
import { ModalService } from '../modal.service';
import { CarregarFotos } from './carregar-fotos';

@Component({
  selector: 'app-carregar-fotos',
  templateUrl: './carregar-fotos.component.html',
  styleUrls: ['./carregar-fotos.component.css']
})

export class CarregarFotosComponent implements OnInit {
  @Output() objetoAdicionado = new EventEmitter<any>();

  file: File | null = null;
  preview!: string;
  fotosProduto: CarregarFotos[] = [];
  imagemPrincipalId: string = '';

  constructor(
    private produtoService: ProdutosService,
    public modalservice: ModalService,
  ) { }

  ngOnInit(): void {
  }

  concluirUpload() {
    this.modalservice.listaDeObjetos.push(this.fotosProduto);
    this.objetoAdicionado.emit(this.fotosProduto);
    this.modalservice.fecharModal();
  }

  cancelarUpload() {
    this.modalservice.fecharModal();
  }

  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }

  selecionarImagem(event: any): void {
    this.file = event.target.files[0] as File;
    if (this.file) {
      this.enviarImagem();
    }
  }

  selecionarImagemPrincipal(id: string) {
    this.fotosProduto.forEach((foto) => {
      if (foto.nome === id) {
        foto.principal = true;
      } else {
        foto.principal = false;
      }
    });
  }


  enviarImagem(): void {
    if (this.file) {
      this.produtoService.enviarImagem(this.file).subscribe(
        (response) => {
          this.fotosProduto.push(response);
          this.selecionarImagemPrincipal(response.nome)
        },
        (error) => {
          console.error('Erro ao enviar a imagem:', error);
        }
      );
    } else {
      console.log('Nenhuma imagem selecionada.');
    }
  }
}
