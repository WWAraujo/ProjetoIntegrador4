import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { LoginComponent } from './componentes/logins/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BackofficeComponent } from './componentes/backoffice/backoffice.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
