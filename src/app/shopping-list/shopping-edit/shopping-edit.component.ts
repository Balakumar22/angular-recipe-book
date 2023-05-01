import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('form') form: NgForm;
  editMode: boolean = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.shoppingService.ingredientToEdit.subscribe((index) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editItem = this.shoppingService.getIngredient(index);
      this.form.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount,
      });
    });
  }

  onAddIngredient() {
    const ingName = this.form.value.name;
    const ingAmount = this.form.value.amount;

    const ingredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.shoppingService.UpdateIngredient(this.editItemIndex, ingredient);
    } else {
      this.shoppingService.AddIngredient(ingredient);
    }

    this.onClear();
  }

  onDelete() {
    this.shoppingService.DeleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }
}
