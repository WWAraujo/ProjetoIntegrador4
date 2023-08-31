import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { AlterarUsuario } from '../alterar-uruario';
import { TipoUsuario } from '../user-role.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css']
})
export class AlterarUsuarioComponent implements OnInit {

  formulario!: FormGroup;
  private usuario!: AlterarUsuario;
  tiposUsuario  = Object.values(TipoUsuario);

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    console.log('construtor do usuario', this.usuario)
    this.usuario = this.service.getAlterarUsuario()
    console.log('construtor depois de tentar receber valor', this.usuario)


    this.formulario = this.fb.group({
      id: [{ value: '',  }, Validators.required],
      nomeUsuario: ['', Validators.required],
      cpfUsuario: ['', Validators.required],
      emailUsuario: [{ value: '',  }, [Validators.required, Validators.email]],
      senhaUsuario: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      ativoInativo: [{ value: '', }, Validators.required],
    });

    this.formulario.patchValue({
      id:           this.usuario?.id,
      nomeUsuario:  this.usuario?.nomeUsuario,
      cpfUsuario:   this.usuario?.cpfUsuario,
      emailUsuario: this.usuario?.emailUsuario,
      ativoInativo: this.usuario?.ativoInativo
    });
  }

  construtor() {
    console.log('construtor do usuario', this.usuario)
    this.usuario = this.service.getAlterarUsuario()
    console.log('construtor depois de tentar receber valor', this.usuario)
  }

  atualizarUsuario(){
    console.log(this.formulario)
    this.service.alterar(this.formulario.value).subscribe(
      response => {
        console.log('Usuário atualizado com sucesso:', response);
        this.router.navigate(['/listarUsuario'])
      },
      error => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/listarUsuario'])

  }
}
