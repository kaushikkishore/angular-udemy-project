import { map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

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
    console.log("Fetch recipe of data storage service called");
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
