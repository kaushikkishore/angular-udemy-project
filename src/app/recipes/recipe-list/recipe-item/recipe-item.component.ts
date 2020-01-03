import { Component, OnInit, Input, Injectable } from "@angular/core";
import { Recipe } from "../../recipe.model";
import { RecipeService } from "../../recipe.service";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  // Recieving from parent component
  @Input() recipe: Recipe;
  @Input() index: number;
  ngOnInit() {}
}
