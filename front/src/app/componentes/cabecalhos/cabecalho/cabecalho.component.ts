import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../cliente/cliente.services';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {

  closeResult: string = '';
  isLogado: boolean = false;
  isDeslogado: boolean = true;

  constructor(private router: Router, private clientService:ClientService,private modalService: NgbModal) {}

  ngOnInit(): void {

    this.verificarLogado();

  }

  deslogar(){
    this.router.navigate(['/solicitarLogin']);
    const usuarioDeslogado = this.clientService.setClienteLogado(this.isDeslogado);
  }

  Login(){
    this.router.navigate(['/solicitarLogin'])
  }

  Register(){
    this.router.navigate(['/cadastrarCliente']);
  }

  telaPrincipal(){
    this.router.navigate(['/cadastroCliente']);
  }

  verificarLogado(){
    const usuarioLogado = this.clientService.getClienteLogado();
    if(usuarioLogado === true){
      this.isLogado = true;
      this.isDeslogado = false;
    }
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
