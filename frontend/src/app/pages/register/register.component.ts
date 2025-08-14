import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  passwordMismatch: boolean = false;
  emailErrorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(3)],
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.passwordMismatch = this.registerForm.hasError('mismatch');
    this.emailErrorMessage = '';
    if (this.registerForm.valid && !this.passwordMismatch) {
      this.isLoading = true;
      console.log('Dados do formulário:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Usuário cadastrado com sucesso.', 'Fechar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erro ao cadastrar usuário', error);
          if (
            error.status === 422 &&
            error.error.errors &&
            error.error.errors.email
          ) {
            this.emailErrorMessage = error.error.errors.email[0];
          }
          let translatedMessage = error.error.message || 'Erro desconhecido';
          if (translatedMessage === 'The given data was invalid.') {
            translatedMessage = 'Dados fornecidos são inválidos.';
          } else if (translatedMessage === 'Unauthenticated.') {
            translatedMessage = 'Usuário não autenticado.';
          } else if (
            translatedMessage === 'The email has already been taken.'
          ) {
            translatedMessage = 'O e-mail já está em uso.';
          } else if (
            translatedMessage === 'The password must be at least 3 characters.'
          ) {
            translatedMessage = 'A senha deve ter no mínimo 3 caracteres.';
          }
          this.snackBar.open(
            'Erro ao cadastrar usuário: ' + translatedMessage,
            'Fechar',
            {
              duration: 5000,
            }
          );
        },
      });
    } else {
      console.log('Formulário inválido:', this.registerForm.errors);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
