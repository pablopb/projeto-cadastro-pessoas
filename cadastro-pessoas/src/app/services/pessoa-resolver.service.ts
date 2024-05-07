import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PessoaService } from './pessoa.service';
import { Pessoa } from '../entities/pessoa.model';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaResolverService implements Resolve<Pessoa> {

  constructor(private pessoaSercvice: PessoaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params["id"];
    if(id){
      return this.pessoaSercvice.pesquisarPorId(id);
    }
    return empty();
  }
}
