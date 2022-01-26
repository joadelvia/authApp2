import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  checkToken(){
    this.authService.validarToken()
    .subscribe({
      next: () => console.log('Token válido'),
      error: resp => {
        console.log(resp.error.message);
        this.router.navigateByUrl('/login')
        
      } 
    }
    )
  }
}
