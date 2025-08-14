import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários', error);
      },
    });
  }

  addUser() {
    this.router.navigate(['/register']);
  }

  removeUser(id: number) {
    this.authService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
        this.snackBar.open('Usuário removido com sucesso.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        console.error('Erro ao remover usuário', error);
      },
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.snackBar.open('Logout realizado com sucesso.', 'Fechar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['/login']);
    });
  }
}
