import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { PessoaService } from '../services/pessoa.service';
import {ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Pessoa } from '../entities/pessoa.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pessoa-cadastrar-editar',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatToolbarModule, MatDatepickerModule, MatButtonModule, RouterOutlet,
    RouterLink, MatDialogModule],
  templateUrl: './pessoa-cadastrar-editar.component.html',
  styleUrl: './pessoa-cadastrar-editar.component.scss'
})


export class PessoaCadastrarEditarComponent implements OnInit {
  formGroup!: FormGroup;
  pessoa!: Pessoa;
  showDeleButton: boolean = false;
  
  constructor(private formBuilder: FormBuilder,
     private pessoaService: PessoaService, 
     private router: Router,
     private route: ActivatedRoute,
     private dialog: MatDialog) {}
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [ this.pessoa && this.pessoa.id ? this.pessoa.id : null],
      nome: [this.pessoa && this.pessoa.dataNascimento ? this.pessoa.nome : null, Validators.required],
      dataNascimento: [this.pessoa && this.pessoa.dataNascimento ? this.pessoa.dataNascimento : null, Validators.required],
      cpf: [this.pessoa && this.pessoa.cpf ? this.pessoa.cpf : null, Validators.required],
      renda: [this.pessoa && this.pessoa.renda ? this.pessoa.renda : null, Validators.required]
    })
    this.route.params.subscribe(params => {
      let id = params['id']; // Access the 'id' parameter from the URL
       this.pessoaService.pesquisarPorId(id).toPromise().then(data =>
        {

          this.pessoa = data as Pessoa;
          this.formGroup.setValue({id:this.pessoa && this.pessoa.id ? this.pessoa.id : null,
            nome: this.pessoa && this.pessoa.dataNascimento ? this.pessoa.nome : null,
            dataNascimento:this.pessoa && this.pessoa.dataNascimento ? this.pessoa.dataNascimento : null,
            cpf: this.pessoa && this.pessoa.cpf ? this.pessoa.cpf : null,
            renda: this.pessoa && this.pessoa.renda ? this.pessoa.renda : null
           });
           this.showDeleButton = true;
        })
    });

  }

  salvar()
  {
    if(this.pessoa && this.pessoa.id){
      this.pessoaService.atualizar(this.formGroup.value).subscribe(

        pessoaAtualizada => {
            this.router.navigateByUrl("/pessoas");
        },
        error => {
          alert("Erro ao atualizar" + JSON.stringify(error));
        }      
      )
    }
    else
    {
      this.pessoaService.cadastrar(this.formGroup.value).subscribe(

        pessoaCadastrada => {
            this.router.navigateByUrl("/pessoas");
        },
        error => {
          alert("Erro ao cadastrar pessoa" + JSON.stringify(error));
        }      
      )
    }
  }

  confirmarExclusao()
  {
    if(confirm("Deseja realmente exlucir essa pessoa?")) {
      this.excluir();
    }
  }

  excluir()
  {
    this.pessoaService.excluir(this.pessoa.id.toString()).subscribe(

      pessoaExcluída=> {
          alert("Pessoa excluída com sucesso!")
          this.router.navigateByUrl("/pessoas");
      },
      error => {
        alert("Erro ao excluir pessoa" + JSON.stringify(error));
      }      
    )
  }

}
