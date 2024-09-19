import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pessoa } from '../../../Pessoa';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pessoa',
  standalone: true,
  imports: [FormsModule, ButtonComponent, CommonModule],
  templateUrl: './add-pessoa.component.html',
  styleUrl: './add-pessoa.component.css',
})
export class AddPessoaComponent {
  @Output() onAddPessoa = new EventEmitter<Pessoa>();
  nome: string = '';
  idade: number = 0;
  email: string = '';
  mostrarAddPessoa: boolean = false;

  alteraVisualizacao(valor: boolean) {
    this.mostrarAddPessoa = valor;
  }

  onSubmit() {
    console.log(this.nome, this.idade, this.email);
    if (!this.nome) {
      alert('Adicione o Nome');
      return;
    }
    if (this.idade <= 0) {
      alert('Adicione uma idade valida!');
      return;
    }
    if (!this.email) {
      alert('Adicione o Email');
      return;
    }

    const novaPessoa = {
      nome: this.nome,
      idade: this.idade,
      email: this.email,
    };

    this.onAddPessoa.emit(novaPessoa);

    this.nome = '';
    this.idade = 0;
    this.email = '';
  }
}
