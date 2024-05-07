import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../entities/pessoa.model';
import { Observable, observable } from 'rxjs';
import { PessoaParser } from './parsers/pessoa.parser';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseURL = 'http://localhost:5098';
  private endpoint = 'pessoa';
  constructor(private httpClient: HttpClient) {

   }

    cadastrar(pessoa: Pessoa): Observable<Pessoa> 
   {
      let parser: PessoaParser = new PessoaParser();
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.httpClient.post<Pessoa>(`${this.baseURL}/${this.endpoint}`, parser.parse(pessoa), httpOptions);
   }

   pesquisarPorId(id: string) :Observable<Pessoa> 
   {
      return this.httpClient.get<Pessoa>(`${this.baseURL}/${this.endpoint}/${id}`);
   }

   listar() :Observable<Pessoa[]> 
   {
      return this.httpClient.get<Pessoa[]>(`${this.baseURL}/${this.endpoint}`);
   }

   atualizar(pessoa: Pessoa): Observable<Pessoa>
   {
    let parser: PessoaParser = new PessoaParser();
     const httpOptions = {
       headers: new HttpHeaders({'Content-Type': 'application/json'})
     }
     return this.httpClient.put<Pessoa>(`${this.baseURL}/${this.endpoint}`, parser.parse(pessoa), httpOptions);
   }

   excluir(id: string) : Observable<{}> 
   {
      return this.httpClient.delete(`${this.baseURL}/${this.endpoint}/${id}`);
   }

}
