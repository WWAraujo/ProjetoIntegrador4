// import { Component, OnInit } from '@angular/core';
// import { ClienteService } from '../cliente.service';
// import { Cliente } from 'src/app/core/types/type';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Validacoes } from '../../usuario/cadastro-usuario/validacoes';

// @Component({
//   selector: 'app-perfil-cliente',
//   templateUrl: './perfil-cliente.component.html',
//   styleUrls: ['./perfil-cliente.component.css']
// })
// export class PerfilClienteComponent implements OnInit {

//   formulario!: FormGroup;
//   idCliente!: number;
//   clienteData!: Cliente;

//   constructor(private service : ClienteService,
//               private formBuilder: FormBuilder,) { }

//   ngOnInit(): void {
//     this.idCliente = this.service.getIdCliente();

//     this.service.exibirPerfil(this.idCliente).subscribe(data => {
//       console.log(data);
//       this.clienteData = data;
//     });

//     this.formulario = this.formBuilder.group({
//       nome: ['', [Validators.required]],
//       dataNascimento: ['',[Validators.required]],
//       genero: ['',[Validators.required]],
//       senha: ['', [Validators.required, Validators.minLength(3)]],
//       confirmarSenha: ['', [Validators.required]],
//     });
//   }

// }
