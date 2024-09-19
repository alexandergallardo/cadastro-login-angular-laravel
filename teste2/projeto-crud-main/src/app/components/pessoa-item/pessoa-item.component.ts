import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pessoa } from '../../../Pessoa';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { OutgoingMessage } from 'http';

@Component({
  selector: 'app-pessoa-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './pessoa-item.component.html',
  styleUrl: './pessoa-item.component.css',
})
export class PessoaItemComponent {
  @Input() pessoa!: Pessoa;
  @Output() onDeletePessoa = new EventEmitter<Pessoa>();
  faTimes = faTimes;

  onDelete(pessoa: Pessoa) {
    this.onDeletePessoa.emit(pessoa);
  }
}
