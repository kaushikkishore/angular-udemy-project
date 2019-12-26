import { Ingredient } from "../shared/ingredients.model";
import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  ingredientsChanges = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("apple", 5),
    new Ingredient("tomato", 4),
    new Ingredient("veggies", 12),
    new Ingredient("onions", 1)
  ];

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanges.emit(this.ingredients.slice()); // this anyone can subscribe to
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanges.emit(this.ingredients.slice()); // this anyone can subscribe to
  }
}
