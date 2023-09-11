import { BackofficeComponent } from './componentes/backoffice/backoffice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/logins/login/login.component';
import { ListarUsuarioComponent } from './componentes/usuario/listar-usuario/listar-usuario.component';
import { CadastroUsuarioComponent } from './componentes/usuario/cadastro-usuario/cadastro-usuario.component';
import { AlterarUsuarioComponent } from './componentes/usuario/alterar-usuario/alterar-usuario.component';
import { ListarProdutosComponent } from './componentes/produtos/listar-produtos/listar-produtos.component';
import { CadastrarProdutosComponent } from './componentes/produtos/cadastrar-produtos/cadastrar-produtos.component';
import { VisualizarProdutosCadastradosComponent } from './componentes/produtos/visualizar-produtos-cadastrados/visualizar-produtos-cadastrados.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'solicitarLogin',
    pathMatch: 'full',
  },
  {
    path: 'solicitarLogin',
    component: LoginComponent,
  },
  {
    path: 'backoffice',
    component: BackofficeComponent,
  },
  {
    path: 'listarUsuario',
    component: ListarUsuarioComponent,
  },
  {
    path: 'cadastrarUsuario',
    component: CadastroUsuarioComponent,
  },
  {
    path: 'alterarUsuario',
    component: AlterarUsuarioComponent,
  },
  {
    path: 'listarProduto',
    component: ListarProdutosComponent,
  },
  {
    path: 'cadastrarProduto',
    component: CadastrarProdutosComponent,
  },
  {
    path: 'visualizarProdutos',
    component: VisualizarProdutosCadastradosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
