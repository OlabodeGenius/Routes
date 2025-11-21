import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    authService = inject(AuthService);
    private router = inject(Router);

    currentUser$ = this.authService.currentUser$;

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }
}
