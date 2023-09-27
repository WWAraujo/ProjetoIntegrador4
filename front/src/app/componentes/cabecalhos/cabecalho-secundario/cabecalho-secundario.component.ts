import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../usuario/user.services';

@Component({
  selector: 'app-cabecalho-secundario',
  templateUrl: './cabecalho-secundario.component.html',
  styleUrls: ['./cabecalho-secundario.component.css']
})
export class CabecalhoSecundarioComponent implements OnInit {

  closeResult: string = '';
  isLogado: boolean = false;
  isDeslogado: boolean = false;


  constructor(
    private router:Router,
    private modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit(): void {

    this.verificarLogado();
    
  }

  verificarLogado(){
    const usuarioLogado = this.userService.getUsuarioLogado();
    console.log(this.isLogado);
    if(usuarioLogado === true){
      this.isLogado = true;
    }
  }

  deslogar(){
    this.router.navigate(['/solicitarLogin']);
    const usuarioDeslogado = this.userService.setUsuarioLogado(this.isDeslogado);
  }

  telaPrincipal(){
    this.router.navigate(['/telaPrincipal']);
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
