import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      "White Kidney beans",
      "Beans recipe",
      "https://storage.needpix.com/rsynced_images/white-kidney-bean-2728708_1280.jpg"
    ),
    new Recipe(
      "Pizza slices",
      "A designer pizza into slices",
      "https://assets.bonappetit.com/photos/5db1ce83358b460009148cb7/master/pass/Basically-Spinach-Tarte-Recipe.jpg"
    )
  ];
  constructor() {}

  // Emit another event
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  ngOnInit() {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
