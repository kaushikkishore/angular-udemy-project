import { map, tap, take, exhaustMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  saveRecipe() {
    const recipes = this.recipeService.getRecipies();
    this.http
      .put(
        "https://ng-recipe-udemy-project.firebaseio.com/recipe.json",
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipe() {
    return this.http
      .get<Recipe[]>(
        "https://ng-recipe-udemy-project.firebaseio.com/recipe.json"
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipies(recipes);
          console.log("Recipe Set");
        })
      );
  }
}
