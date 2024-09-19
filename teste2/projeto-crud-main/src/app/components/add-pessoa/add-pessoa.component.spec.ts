import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPessoaComponent } from './add-pessoa.component';

describe('AddPessoaComponent', () => {
  let component: AddPessoaComponent;
  let fixture: ComponentFixture<AddPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPessoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
