import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth: Auth = inject(Auth);
    currentUser$: Observable<User | null> = user(this.auth);

    signup(email: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.auth, email, password).then(() => undefined);
        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.auth, email, password).then(() => undefined);
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.auth);
        return from(promise);
    }
}
