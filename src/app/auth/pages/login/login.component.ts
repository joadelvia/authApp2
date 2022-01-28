import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email:    ['bruno@email.com', [ Validators.required, Validators.email ]],
    password: ['bruno', [ Validators.required, Validators.minLength(4) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router, 
               private authService: AuthService) { }


  login() {
  
    const { email, password } = this.miFormulario.value;

    this.authService.login( email, password )
    .subscribe({
       next: (resp => {
         localStorage.setItem('token',resp.access_token!)
         this.router.navigateByUrl('/dashboard');
      }),
       error: resp => {
         console.log(resp);
         
         Swal.fire('Error', resp.error.message, 'error')
       }
    });
  }

  

}
