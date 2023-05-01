import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent {
  id: number;
  editMode: boolean = false;

  form: FormGroup;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private setUpIngredient(name = null, amount = null) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[0-9]+[0-9]*$/),
      ]),
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDecription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDecription = recipe.description;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ingredient) => {
          recipeIngredients.push(
            this.setUpIngredient(ingredient.name, ingredient.amount)
          );
        });
      }
    }

    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDecription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipesService.UpdateRecipe(this.id, this.form.value);
    } else {
      this.recipesService.AddRecipe(this.form.value);
    }

    this.onCancel();
  }

  get ingredients() {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(this.setUpIngredient());
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
