import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../../Pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  private apiUrl = 'http://localhost:3000/pessoas';

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiUrl);
  }

  deletePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.delete<Pessoa>(`${this.apiUrl}/${pessoa.id}`);
  }

  addPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.apiUrl}`, pessoa);
  }
}
