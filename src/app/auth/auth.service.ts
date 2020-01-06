import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

import { User } from "./auth/user.model";
import { strictEqual } from "assert";
import { environment } from "src/environments/environment";

export interface AuthResponseData {
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
	user = new BehaviorSubject<User>(null);
	autoLogoutTimer: any;
	constructor(private http: HttpClient, private router: Router) {}

	signup(email: string, password: string) {
		return this.http
			.post<AuthResponseData>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(this.handleError),
				tap(responseData => {
					const { email, localId, idToken, expiresIn } = responseData;
					this.handleAuthentication(email, localId, idToken, +expiresIn);
				})
			);
	}

	login(email: string, password: string) {
		return this.http
			.post<AuthResponseData>(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
				{
					email: email,
					password: password,
					returnSecureToken: true
				}
			)
			.pipe(
				catchError(this.handleError),
				tap(responseData => {
					const { email, localId, idToken, expiresIn } = responseData;
					this.handleAuthentication(email, localId, idToken, +expiresIn);
				})
			);
	}

	logout() {
		this.user.next(null);
		this.router.navigate(["/auth"]);
		// localStorage.clear(); // Clear all the data
		localStorage.removeItem("userData");

		if (this.autoLogoutTimer) {
			clearInterval(this.autoLogoutTimer);
		}
		this.autoLogoutTimer = null;
	}

	autoLogin() {
		const userData: {
			email: string;
			id: string;
			_token: string;
			_tokenExpirationDate: string;
		} = JSON.parse(localStorage.getItem("userData"));

		if (!userData) {
			return;
		}

		const existingUser = new User(
			userData.email,
			userData.id,
			userData._token,
			new Date(userData._tokenExpirationDate)
		);

		if (existingUser.token) {
			this.user.next(existingUser);
			const expirationDate =
				+new Date(userData._tokenExpirationDate) - +new Date();

			this.autoLogout(expirationDate);
		}
	}

	autoLogout(expirationDuration: number) {
		this.autoLogoutTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}

	private handleAuthentication(
		email: string,
		id: string,
		token: string,
		expiresIn: number
	) {
		const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
		const user = new User(email, id, token, expirationTime);

		this.user.next(user);
		this.autoLogout(expiresIn * 1000);
		localStorage.setItem("userData", JSON.stringify(user));
	}

	private handleError(errorResponse: HttpErrorResponse) {
		console.log(errorResponse);
		let errorMessage = "There was an error while processing your request";

		if (!errorResponse.error || !errorResponse.error.error) {
			return throwError(errorResponse);
		}

		switch (errorResponse.error.error.message) {
			case "EMAIL_EXISTS":
				errorMessage = "The email address already exists!";
				break;
			case "EMAIL_NOT_FOUND":
				errorMessage = "Email not found";
				break;
			case "INVALID_PASSWORD":
				errorMessage = "Invalid password.";
				break;
			case "USER_DISABLED":
				errorMessage = "You're disabled for now";
				break;
			case "OPERATION_NOT_ALLOWED":
				errorMessage = "Password sign-in is disabled for this project";
				break;
			case "TOO_MANY_ATTEMPTS_TRY_LATER":
				errorMessage = "Too many attempts for now. Try again later";
				break;
		}

		return throwError(errorMessage);
	}
}
