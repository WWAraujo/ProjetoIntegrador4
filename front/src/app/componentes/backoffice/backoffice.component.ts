import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  constructor(
    private router: Router,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  irParaUsuarios(){
    this.router.navigate(['listarUsuario'])
  }

}
