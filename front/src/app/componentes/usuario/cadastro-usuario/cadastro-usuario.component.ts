import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { TipoUsuario } from '../user-role.enum';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})

export class CadastroUsuarioComponent implements OnInit {

  formulario!: FormGroup;
  tiposUsuario  = Object.values(TipoUsuario);
  emailEncontrado: boolean = false;
  clienteCadastrado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: '',
      cpf: '',
      email: '',
      tipoUsuario: [''],
      senha: ''

    //   nome: ['', Validators.compose([
    //     Validators.required,
    //     Validators.min(3)
    //   ])],

    //   cpf: ['', Validators.compose([
    //     Validators.required,
    //   ])],

    //   email: ['', Validators.compose([
    //     Validators.required,
    //   ])],

    //   TipoUsuario: ['', Validators.compose([
    //     Validators.required,
    //   ])],

    //   senha: ['', Validators.compose([
    //     Validators.required,
    //     Validators.minLength(3)
    //   ])]
    })

  }

  inputChanged = new Subject<void>();
  onInputChanged() {
    this.inputChanged.next();
  }

  procurarEmail() {
    const email = this.formulario.get('email')?.value
    this.service.procurarEmail(email).subscribe((emailEncontrado) => {
      this.emailEncontrado = emailEncontrado
      console.log('resultado da consulta',emailEncontrado)
    })

  }

  cadastrarUsuario() {
    if (this.emailEncontrado.valueOf()){
      this.service.cadastrar(this.formulario.value).subscribe((clienteCadastrado) => {
        if (!clienteCadastrado){
          this.router.navigate(['/listarUsuario'])
          console.log('Usuário cadastrado com sucesso:', this.formulario.value)
        } else{
          alert('Algo deu errado no cadastro')
        }
      })
    } else{
      alert('Email já cadastrado')

    }
  }

  // habilitarBotao(): string {
  //   if(this.formulario.valid){
  //     return 'botao'
  //   } else {
  //     return 'botao__desabilitado'
  //   }
  // }

  // validarCpf(control: { value: string }): { [key: string]: any } | null {
  //   const cpf = control.value.replace(/\D/g, ''); // Remove non-digit characters

  //   if (cpf.length !== 11) {
  //     return { 'invalidCpf': true }; // Return an error if CPF length is not 11
  //   }

  //   // Check for repeated digits
  //   if (/^(\d)\1+$/.test(cpf)) {
  //     return { 'invalidCpf': true };
  //   }

  //   // Validate CPF algorithm
  //   let sum = 0;
  //   let remainder: number;

  //   for (let i = 1; i <= 9; i++) {
  //     sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  //   }

  //   remainder = (sum * 10) % 11;

  //   if ((remainder === 10) || (remainder === 11)) {
  //     remainder = 0;
  //   }

  //   if (remainder !== parseInt(cpf.substring(9, 10))) {
  //     return { 'invalidCpf': true };
  //   }

  //   sum = 0;
  //   for (let i = 1; i <= 10; i++) {
  //     sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  //   }

  //   remainder = (sum * 10) % 11;

  //   if ((remainder === 10) || (remainder === 11)) {
  //     remainder = 0;
  //   }

  //   if (remainder !== parseInt(cpf.substring(10, 11))) {
  //     return { 'invalidCpf': true };
  //   }

  //   return null; // CPF is valid
  // }
}
