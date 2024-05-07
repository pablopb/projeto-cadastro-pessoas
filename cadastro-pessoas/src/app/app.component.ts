import { Component } from '@angular/core';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { PessoaService } from './services/pessoa.service';
import { PessoaResolverService } from './services/pessoa-resolver.service';
import { NgxMaskDirective, NgxMaskPipe,provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainNavComponent, MatDatepickerModule, MatNativeDateModule, HttpClientModule],
  templateUrl: './app.component.html',
  providers:[PessoaService, PessoaResolverService, NgxMaskDirective, NgxMaskPipe, provideNgxMask({ /* opções de cfg */ })],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cadastro-pessoas';
}
