import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente, Genero } from 'src/app/core/types/type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validacoes } from '../../usuario/cadastro-usuario/validacoes';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  formulario!: FormGroup;
  idCliente!: number;
  clienteData!: Cliente;
  genero = Object.values(Genero);

  constructor(private service : ClienteService,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.idCliente = this.service.getIdCliente();
    console.log(this.idCliente);

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      dataNascimento: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmarSenha: ['', [Validators.required]],
    });
    this.service.exibirPerfil(this.idCliente).subscribe(data => {

      this.clienteData = data;
      console.log(data);
    } )
  }

}
