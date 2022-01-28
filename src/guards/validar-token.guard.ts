import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from "rxjs";
import { AuthResponse } from "src/app/auth/interfaces/interfaces";
import { AuthService } from '../app/auth/services/auth.service';





@Injectable({
    providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {
    constructor( private authService: AuthService,
        private router: Router ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>| any {
        let access=false;
        this.authService.validarToken()
        .subscribe({
            next: (resp) => {
                access=true;},
            error: (resp) => {
                access=false;
                
                //this.router.navigateByUrl('/auth/login')
                   }
                });
                return access;
    }

}