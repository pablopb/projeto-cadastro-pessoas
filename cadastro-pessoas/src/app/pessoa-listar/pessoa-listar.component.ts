import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PessoaService } from '../services/pessoa.service';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pessoa } from '../entities/pessoa.model';

@Component({
  selector: 'app-pessoa-listar',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule,  RouterOutlet,
    RouterLink, MatToolbar, CommonModule, MatButtonModule],
  templateUrl: './pessoa-listar.component.html',
  styleUrl: './pessoa-listar.component.scss'
})
export class PessoaListarComponent  implements OnInit{
  constructor(private pessoaService: PessoaService)
  {
  }
  pessoas$: Observable<Pessoa[]>;

  ngOnInit(): void {
    this.pessoas$ = this.pessoaService.listar();
  }

  formatarCPF(cpf: string): string
  {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarData(data: string): string
  {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  formatarRenda(renda: number): string
  {
    return `R\$${renda.toFixed(2).replace('.', ',')}`;
  }

  editar(id: number): string
  {
    return `/pessoas/cadadastrar/${id}`; 
  }

}
