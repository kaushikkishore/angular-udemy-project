import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

import { AuthService, AuthResponseData } from "../auth.service";
import { User } from "./user.model";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.component.html",
	styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
	isLoginMode = true;
	isLoading = false;
	error: string = null;
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {}

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) {
			return;
		}

		const { email, password } = form.value;

		let authObs: Observable<AuthResponseData>;
		this.isLoading = true;

		if (this.isLoginMode) {
			authObs = this.authService.login(email, password);
		} else {
			authObs = this.authService.signup(email, password);
		}

		authObs.subscribe(
			response => {
				console.log(response);
				this.isLoading = false;
				this.router.navigate(["/recipes"]);
			},
			errorMessage => {
				console.log(errorMessage);
				this.error = errorMessage;
				this.isLoading = false;
			}
		);

		form.reset();
	}
}
