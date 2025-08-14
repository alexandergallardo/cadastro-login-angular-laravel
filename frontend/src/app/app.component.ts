import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      if (!loggedIn) {
        this.snackBar.open(
          'Tempo de conexão expirado. Por favor, faça login novamente.',
          'Fechar',
          {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
        this.router.navigate(['/login']);
      }
    });
  }
}
