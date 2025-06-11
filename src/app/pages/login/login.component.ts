import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'teste@teste.com' && this.senha === '123') {
      console.log('Login bem-sucedido');
      this.router.navigate(['/catalogo']);
    } else {
      alert('Credenciais inválidas');
    }
  }

  onLogin() {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);
    this.login(); // ou use direto login()
  }

  onForgotPassword() {
    alert('Redirecionar para recuperação de senha.');
  }
}
