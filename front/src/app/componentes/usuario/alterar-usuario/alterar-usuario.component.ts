import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Validacoes } from '../cadastro-usuario/validacoes';
import { AlterarUsuario, TipoUsuario } from 'src/app/core/types/type';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css'],
})
export class AlterarUsuarioComponent implements OnInit {
  formulario!: FormGroup;
  private usuario!: AlterarUsuario;
  tiposUsuario = Object.values(TipoUsuario);
  campoBloqueado = true;
  senhaCorrespondente: boolean = true;

  constructor(
    private formbuilder: FormBuilder,
    private service: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.service.getAlterarUsuario();

    this.formulario = this.formbuilder.group({
      id: [{ value: '' }, Validators.required],
      nomeUsuario: ['', Validators.required],
      cpfUsuario: ['', [Validators.required, Validacoes.ValidaCPF]],
      emailUsuario: [{ value: '' }, [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmacaoSenha: ['', [Validators.required]],
      tipoUsuario: ['', [Validators.required]],
      ativoInativo: [{ value: '' }, Validators.required],
    });

    this.formulario.patchValue({
      id: this.usuario?.id,
      nomeUsuario: this.usuario?.nomeUsuario,
      cpfUsuario: this.usuario?.cpfUsuario,
      emailUsuario: this.usuario?.emailUsuario,
      tiposUsuario: this.usuario?.tipoUsuario,
      ativoInativo: this.usuario?.ativoInativo,
    });
  }

  construtor() {
    this.usuario = this.service.getAlterarUsuario();
  }

  atualizarUsuario() {
    this.service.alterar(this.formulario.value).subscribe(
      (response) => {
        this.router.navigate(['/listarUsuario']);
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }

  validarSenha() {
    const senha = this.formulario.get('senha')?.value;
    const confirmacaoSenha = this.formulario.get('confirmacaoSenha')?.value;
    this.senhaCorrespondente = senha === confirmacaoSenha;
  }

  cancelar() {
    this.router.navigate(['/listarUsuario']);
  }

  habilitarBotao(): string {
    if (this.formulario.valid && this.senhaCorrespondente) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
