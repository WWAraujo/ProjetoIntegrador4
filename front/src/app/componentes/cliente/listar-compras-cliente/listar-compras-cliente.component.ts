import { Venda, Produto } from './../../../core/types/type';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente, ProdutoFotos, ProdutosVenda } from 'src/app/core/types/type';
import { LoginService } from '../../logins/login.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarrinhoService } from '../../compra/carrinho.service';
import { ProdutosService } from '../../produtos/produtos.service';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;
@Component({
  selector: 'app-listar-compras-cliente',
  templateUrl: './listar-compras-cliente.component.html',
  styleUrls: ['./listar-compras-cliente.component.css']
})
export class ListarComprasClienteComponent implements OnInit {

  listaProdutos: Venda[] = [];
  dadosCliente!: Cliente;
  templateAberto: boolean = false;
  idProduto: number = 0;
  closeResult: string = '';
  venda!: Venda;
  lista: ProdutosVenda[] = [];
  productData: ProdutoFotos[]=[];
  ativoInativo!: string;
  semEstoque: number = 0;
  imagemPrincipal!: string;
  produtoIndisponivel: boolean = false;
  imagensSecundarias: string[] = [];
  content: any;

  constructor(
    private clienteService: ClienteService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private service: CarrinhoService,
    private produtoService: ProdutosService
  ) { }

  ngOnInit(): void {
    this.dadosCliente = this.loginService.getData('clienteData');
    this.clienteService.listarCompras(this.dadosCliente.id).subscribe((lista) => {
      this.listaProdutos = lista;
      console.log(lista);
    })
  }


  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  pegarId(id: number){
    this.idProduto=id;
    this.service.getVenda(this.idProduto).subscribe((response) => {
      console.log('response',response);
      this.venda = response;
      this.lista = this.venda.produtos;
      for(let produto of this.lista){
        this.pegarProduto(produto.idProduto);
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.productData = [];
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  pegarProduto(id: number){
    this.produtoService.getProdutoCompleto(id).subscribe(data => {
      this.productData.push(data);
      for(let produto of this.productData){
        const number = produto.produto.id;

        for(let venda of this.venda.produtos){
          if (number === venda.idProduto){
            console.log('Quantidade salva', venda.quantidade);

          }
        }
      }
    })

  }


  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
