import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // importe aqui

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // adicione aqui
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  onLogin() {
    console.log('Email:', this.email);
    console.log('Senha:', this.senha);
  }

  onForgotPassword() {
    alert('Redirecionar para recuperação de senha.');
  }
}
