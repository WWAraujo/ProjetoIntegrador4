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
  campoBloqueado = true;

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.usuario = this.service.getAlterarUsuario()


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
    this.usuario = this.service.getAlterarUsuario()
  }

  atualizarUsuario(){
    this.service.alterar(this.formulario.value).subscribe(
      response => {
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
