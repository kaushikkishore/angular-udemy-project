import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("apple", 5),
    new Ingredient("tomato", 4),
    new Ingredient("veggies", 12),
    new Ingredient("onions", 1)
  ];
  constructor() {}

  ngOnInit() {}

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
