import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaListarComponent } from './pessoa-listar.component';

describe('PessoaListarComponent', () => {
  let component: PessoaListarComponent;
  let fixture: ComponentFixture<PessoaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaListarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PessoaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
