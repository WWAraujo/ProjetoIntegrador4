import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
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
      nome: ['',[Validators.required]],
      cpf: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      tipoUsuario: ['',[Validators.required]],
      senha: ['',[Validators.required,Validators.minLength(3)]]
    });
  }

  inputChanged = new Subject<void>();
  onInputChanged() {
    this.inputChanged.next();
  }

  procurarEmail() {
    const email = this.formulario.get('email')?.value
    this.service.procurarEmail(email).subscribe((emailEncontrado) => {
      this.emailEncontrado = emailEncontrado
    })

  }

  cadastrarUsuario() {
    if (!this.emailEncontrado.valueOf()){
      this.service.cadastrar(this.formulario.value).subscribe((clienteCadastrado) => {
        if (clienteCadastrado){
          this.router.navigate(['/listarUsuario'])
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


}
