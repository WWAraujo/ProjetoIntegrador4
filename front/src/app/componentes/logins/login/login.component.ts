import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: LoginService,
    private router: Router,
    private formeBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formulario = this.formeBuilder.group({
      email: ['', Validators.required],
      senhaad: ['', Validators.required]
    })
  }

  solicitarLogin() {
    console.log(this.formulario.value);
    if(this.formulario.valid){
      this.service.solicitarLogin(this.formulario.value).subscribe(() => {
        this.router.navigate(['/home'])
      })
    }
  }

}
