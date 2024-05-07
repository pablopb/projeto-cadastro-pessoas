import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PessoaListarComponent } from './pessoa-listar/pessoa-listar.component';
import { PessoaCadastrarEditarComponent } from './pessoa-cadastrar-editar/pessoa-cadastrar-editar.component';
import { PessoaResolverService } from './services/pessoa-resolver.service';

export const routes: Routes = [{path:"", component: HomeComponent},
    {path:"pessoas", component: PessoaListarComponent},
    {path:"pessoas/cadastrar", component: PessoaCadastrarEditarComponent},
    {path:"pessoas/cadastrar/:id", component: PessoaCadastrarEditarComponent}];
