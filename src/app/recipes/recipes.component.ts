import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  selectedRecipe: Recipe;
  private selectedSub: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.selectedSub = this.recipesService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

  ngOnDestroy() {
    this.selectedSub.unsubscribe();
  }
}
