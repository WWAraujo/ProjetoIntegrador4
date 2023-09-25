import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cabecalho-secundario',
  templateUrl: './cabecalho-secundario.component.html',
  styleUrls: ['./cabecalho-secundario.component.css']
})
export class CabecalhoSecundarioComponent implements OnInit {
  closeResult: string = '';

  constructor(private router:Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  deslogar(){
    this.router.navigate(['/solicitarLogin']);

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
