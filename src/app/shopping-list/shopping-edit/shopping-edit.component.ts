import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";

import { Ingredient } from "src/app/shared/ingredients.model";
import { ShoppingListComponent } from "../shopping-list.component";
import { ShoppingListService } from "../shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput", { static: false }) nameInputRef: ElementRef;
  // @ViewChild("amountInput", { static: false }) amountInputRef: ElementRef;
  @ViewChild("f", { static: false }) shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmitItem(form: NgForm) {
    // const newIngredient = new Ingredient(
    //   this.nameInputRef.nativeElement.value,
    //   this.amountInputRef.nativeElement.value
    // );
    // this.shoppingListService.addIngredient(newIngredient);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
