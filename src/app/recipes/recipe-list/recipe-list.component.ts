import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[];
  recipeChangedSubscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipeChangedSubscription =
      this.recipesService.recipesChanged.subscribe((recipes) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipesService.getRecipies();
  }

  ngOnDestroy() {
    this.recipeChangedSubscription.unsubscribe();
  }
}
