export interface Login {
  usuario: string;
  senha: string;
}

export interface ClienteLogado{
  id: number;
  }

export interface Logado {
  id: string;
  tipoUsuario: string;
}

export interface ListarUsuario {
  id: number;
  nomeUsuario: string;
  emailUsuario: string;
  ativoInativo: string;
  tipoUsuario: string;
}

export interface AlterarUsuario {
  id: string;
  nomeUsuario: string;
  cpfUsuario: string;
  emailUsuario: string;
  tipoUsuario: string;
  senhaUsuario: string;
  ativoInativo: string;
}

export enum TipoUsuario {
  ADMINISTRADOR = 'ADMINISTRADOR',
  ESTOQUISTA = 'ESTOQUISTA',
}

export enum AtivoInativo {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

export enum Genero{
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTROS = 'OUTROS'
}

export interface DeletarUsuario {
  id: number;
}

export interface Produto {
  id: number;
  nomeProduto: string;
  descricaoDetalhadaProduto: string;
  precoProduto: number;
  qtdEstoque: number;
  ativoInativo: string;
  avaliacao: number;
}

export interface AvaliacaoProduto {
  idProduto: number;
  avaliacao: number;
}

export interface CarregarFotos {
  idProduto: number;
  nomeImg: string;
  caminhoImg: string;
  flagImg: string;
}

export interface ProdutoFotos {
  produto: Produto;
  fotosProdutoRecord: CarregarFotos[] ;
}

export interface ProdutoCompleto {
  produto: Produto;
  avaliacaoProdutoRecord: AvaliacaoProduto;
  fotosProdutoRecord: CarregarFotos[] ;
}

export interface PaginaProdutos {
  content: Produto[];
  pageable: any;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  empty: boolean;
}

export interface Cliente{
  id: number;
  nomeCliente: string;
  cpfCliente: string;
  datanascCliente: string;
  generoCliente: string;
  telefoneCliente: string;
  emailCliente: string;
  senhaCliente: string;
  confirmacaoSenha: String;
}

export interface Endereco {
  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  ativoInativo: AtivoInativo;
  enderecoPrincipal: string;
}

export interface ClienteCompleto{
  cliente: Cliente;
  enderecos: Endereco[];
}
