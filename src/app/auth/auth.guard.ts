import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		router: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| boolean
		| UrlTree
		| Promise<boolean | UrlTree>
		| Observable<boolean | UrlTree> {
		return this.authService.user.pipe(
			take(1),

			map(user => {
				const isAUthenticated = !!user;
				if (isAUthenticated) {
					return true;
				}

				return this.router.createUrlTree(["/auth"]);
				// return true;
			})
		);
	}
}
