import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}login`, { email: username, password: password })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response
                if (data.user && data.user.token) {
                    this.getAuthLevel(data.user.id);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                }

                return data.user;
            }));

    }

    getAuthLevel(id: number) {
        this.http.get(`${environment.apiUrl}get_user_autho_level/` + id).pipe(map(data => {
            if (data) {
                localStorage.setItem('currentUserLevel', JSON.stringify(data['level']));
            }
        }));


    }
    logout() {
        // remove user from local storage to log user out
          localStorage.removeItem('currentUser');
    }
}