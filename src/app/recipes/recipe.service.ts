import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "White Kidney beans",
      "Beans recipe",
      "https://storage.needpix.com/rsynced_images/white-kidney-bean-2728708_1280.jpg",
      [
        new Ingredient("Kedney beans", 1),
        new Ingredient("French fries", 20),
        new Ingredient("Spices", 5),
        new Ingredient("Salt", 10)
      ]
    ),
    new Recipe(
      "Pizza slices",
      "A designer pizza into slices",
      "https://assets.bonappetit.com/photos/5db1ce83358b460009148cb7/master/pass/Basically-Spinach-Tarte-Recipe.jpg",
      [
        new Ingredient("bread", 2),
        new Ingredient("Paneer", 10),
        new Ingredient("Spices", 5),
        new Ingredient("Salt", 10)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipies() {
    return this.recipes.slice(); // New array as copy of above one.
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
