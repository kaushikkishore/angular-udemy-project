import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Subscription } from "rxjs";
import { User } from "../auth/auth/user.model";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-header",
	styleUrls: ["./header.component.css"],
	templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
	/**
	 *
	 */
	private userSub: Subscription;
	isAuthenticated = false;
	constructor(
		private dataStorageService: DataStorageService,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
		});
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}

	onSaveData() {
		this.dataStorageService.saveRecipe();
	}

	onFetchData() {
		this.dataStorageService.fetchRecipe().subscribe();
	}

	onLogout() {
		this.authService.logout();
	}
}
