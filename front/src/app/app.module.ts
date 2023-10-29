import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalhos/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { LoginComponent } from './componentes/logins/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BackofficeComponent } from './componentes/usuario/backoffice/backoffice.component';
import { CadastroUsuarioComponent } from './componentes/usuario/cadastro-usuario/cadastro-usuario.component';
import { AlterarUsuarioComponent } from './componentes/usuario/alterar-usuario/alterar-usuario.component';
import { ListarUsuarioComponent } from './componentes/usuario/listar-usuario/listar-usuario.component';
import { UserService } from './componentes/usuario/user.services';
import { VisualizarProdutosCadastradosComponent } from './componentes/produtos/visualizar-produtos-cadastrados/visualizar-produtos-cadastrados.component';
import { ListarProdutosComponent } from './componentes/produtos/listar-produtos/listar-produtos.component';
import { CadastrarProdutosComponent } from './componentes/produtos/cadastrar-produtos/cadastrar-produtos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdutoComponent } from './componentes/produtos/produto/produto.component';
import { CarregarFotosComponent } from './componentes/produtos/cadastrar-produtos/carregar-fotos/carregar-fotos.component';
import { UserPipe } from './componentes/usuario/listar-usuario/usuarios.pipe';
import { CommonModule } from '@angular/common';
import { TelaPrincipalComponent } from './componentes/produtos/tela-principal/tela-principal.component';
import { CadastroClienteComponent } from './componentes/cliente/cadastro-cliente/cadastro-cliente.component';
import { ProdutoDetalhadoComponent } from './componentes/produtos/produto-detalhado/produto-detalhado.component';
import { CabecalhoSecundarioComponent } from './componentes/cabecalhos/cabecalho-secundario/cabecalho-secundario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnderecosComponent } from './componentes/cliente/enderecos/enderecos.component';
import { FormatDirective } from './componentes/cliente/enderecos/cep/format.directive';
import { AlterarClienteComponent } from './componentes/cliente/alterar-cliente/alterar-cliente.component';
import { CarrinhoComponent } from './componentes/compra/carrinho/carrinho.component';
import { CheckoutComponent } from './componentes/compra/checkout/checkout.component';
import { SelecionarEnderecoComponent } from './componentes/compra/selecionar-endereco/selecionar-endereco.component';
import { PagamentoComponent } from './componentes/compra/pagamento/pagamento.component';
import { ResumoComponent } from './componentes/compra/resumo/resumo.component';
import { FinalizarComponent } from './componentes/compra/finalizar/finalizar.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    CabecalhoSecundarioComponent,
    RodapeComponent,
    LoginComponent,
    BackofficeComponent,
    CadastroUsuarioComponent,
    AlterarUsuarioComponent,
    ListarUsuarioComponent,
    VisualizarProdutosCadastradosComponent,
    ListarProdutosComponent,
    CadastrarProdutosComponent,
    ProdutoComponent,
    CarregarFotosComponent,
    UserPipe,
    TelaPrincipalComponent,
    CadastroClienteComponent,
    ProdutoDetalhadoComponent,
    EnderecosComponent,
    FormatDirective,
    AlterarClienteComponent,
    CarrinhoComponent,
    CheckoutComponent,
    SelecionarEnderecoComponent,
    PagamentoComponent,
    ResumoComponent,
    FinalizarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    NgbModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
