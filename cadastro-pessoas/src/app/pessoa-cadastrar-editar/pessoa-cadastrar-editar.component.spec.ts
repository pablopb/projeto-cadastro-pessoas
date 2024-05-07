import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCadastrarEditarComponent } from './pessoa-cadastrar-editar.component';

describe('PessoaCadastrarEditarComponent', () => {
  let component: PessoaCadastrarEditarComponent;
  let fixture: ComponentFixture<PessoaCadastrarEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaCadastrarEditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaCadastrarEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
