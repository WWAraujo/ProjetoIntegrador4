import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { ModalService } from './modal.service';
import { CarregarFotos } from './carregar-fotos/carregar-fotos';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {
  @Input() objetos: any[] | undefined;

  modalAberto = false;
  formularioProduto!: FormGroup;
  fotosProduto: CarregarFotos[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    public modalservice: ModalService
  ) {}

  ngOnInit(): void {
    this.formularioProduto = this.formBuilder.group({
      nomeProduto: ['', Validators.required],
      descricaoProduto: ['', Validators.required],
      precoProduto: ['', Validators.required],
      qtdEstoque: ['', Validators.required],
      ativoInativo: ['', Validators.required]
    });

    this.modalservice.fecharModalEvent.subscribe(() => {
      this.fecharModal();
    });

    console.log(this.fotosProduto)
  }

  submitForm() {
    if (this.formularioProduto.invalid) {
      return;
    }

    const produtoData = this.formularioProduto.value;
    this.produtosService.cadastrarProduto(produtoData).subscribe(
      (response) => {
        console.log('Produto cadastrado com sucesso:', response);
        // Limpe o formulário ou faça ações adicionais, se necessário.
      },
      (error) => {
        console.error('Erro ao cadastrar produto:', error);
        // Trate o erro ou exiba uma mensagem de erro para o usuário.
      }
    );
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: true,
    infinite: true,
    centerMode: false,
  };

  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }
}
