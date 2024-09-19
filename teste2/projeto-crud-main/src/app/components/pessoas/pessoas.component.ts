import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../../services/pessoas.service';
import { Pessoa } from '../../../Pessoa';
import { CommonModule } from '@angular/common';
import { PessoaItemComponent } from '../pessoa-item/pessoa-item.component';
import { AddPessoaComponent } from '../add-pessoa/add-pessoa.component';

@Component({
  selector: 'app-pessoas',
  standalone: true,
  imports: [CommonModule, PessoaItemComponent, AddPessoaComponent],
  templateUrl: './pessoas.component.html',
  styleUrl: './pessoas.component.css',
})
export class PessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];

  constructor(private pessoasService: PessoasService) {}

  ngOnInit(): void {
    this.pessoasService.getPessoas().subscribe((dado) => {
      this.pessoas = dado;
      console.log(dado);
    });
  }

  deletePessoa(pessoa: Pessoa) {
    this.pessoasService
      .deletePessoa(pessoa)
      .subscribe(
        () => (this.pessoas = this.pessoas.filter((p) => p.id !== pessoa.id))
      );
  }

  AddPessoa(pessoa: Pessoa) {
    this.pessoasService.addPessoa(pessoa).subscribe((pessoa) => {
      this.pessoas.push(pessoa);
    });
  }
}
