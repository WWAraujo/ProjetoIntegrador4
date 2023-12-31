import { BackofficeComponent } from './componentes/usuario/backoffice/backoffice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/logins/login/login.component';
import { ListarUsuarioComponent } from './componentes/usuario/listar-usuario/listar-usuario.component';
import { CadastroUsuarioComponent } from './componentes/usuario/cadastro-usuario/cadastro-usuario.component';
import { AlterarUsuarioComponent } from './componentes/usuario/alterar-usuario/alterar-usuario.component';
import { ListarProdutosComponent } from './componentes/produtos/listar-produtos/listar-produtos.component';
import { CadastrarProdutosComponent } from './componentes/produtos/cadastrar-produtos/cadastrar-produtos.component';
import { VisualizarProdutosCadastradosComponent } from './componentes/produtos/visualizar-produtos-cadastrados/visualizar-produtos-cadastrados.component';
import { TelaPrincipalComponent } from './componentes/produtos/tela-principal/tela-principal.component';
import { CadastroClienteComponent } from './componentes/cliente/cadastro-cliente/cadastro-cliente.component';
import { ProdutoDetalhadoComponent } from './componentes/produtos/produto-detalhado/produto-detalhado.component';
import { EnderecosComponent } from './componentes/cliente/enderecos/enderecos.component';
import { AlterarClienteComponent } from './componentes/cliente/alterar-cliente/alterar-cliente.component';
import { CheckoutComponent } from './componentes/compra/checkout/checkout.component';
import { AlterarProdutoEstoquistaComponent } from './componentes/usuario/alterar-pedidos-estoquista/alterar-pedidos-estoquista.component';
import { ListarComprasClienteComponent } from './componentes/cliente/listar-compras-cliente/listar-compras-cliente.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'telaPrincipal',
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
  {
    path: 'telaPrincipal',
    component: TelaPrincipalComponent,
  },
  {
    path: 'cadastrarCliente',
    component: CadastroClienteComponent,
  },
  {
    path: 'alterarCliente',
    component: AlterarClienteComponent,
  },
  {
    path: 'produtoDetalhado',
    component: ProdutoDetalhadoComponent, data: { mostrarCabecalho: true }
  },
  {
    path: 'endereco',
    component: EnderecosComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'estoquista',
    component: AlterarProdutoEstoquistaComponent
  },
  {
    path: 'alterar-produtos-estoquista',
    component: AlterarProdutoEstoquistaComponent
  },
  {
    path: 'listarProdutosCliente',
    component: ListarComprasClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
