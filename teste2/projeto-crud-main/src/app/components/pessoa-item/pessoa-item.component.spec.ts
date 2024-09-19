import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaItemComponent } from './pessoa-item.component';

describe('PessoaItemComponent', () => {
  let component: PessoaItemComponent;
  let fixture: ComponentFixture<PessoaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoaItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
