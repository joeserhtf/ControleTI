import { UserInterface } from './../../models/user-interface';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public user: UserInterface = {
    nome: "",
    email: "",
    password: ""
  };

  ngOnInit() {

  }
  
  onRegister(): void{
    this.authService.registerUser(
      this.user.nome,
      this.user.email,
      this.user.password
      )
      .subscribe( user => {
        this.authService.setUser(user);
        let token = user.id;
        this.authService.setToken(token);
        this.router.navigate(['/admin/unidades']);
      });
  }
}
