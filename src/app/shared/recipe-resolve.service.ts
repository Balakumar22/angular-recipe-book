import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from './data-storage.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolveService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipesService.getRecipies();
    if (recipes.length === 0) return this.dataStorageService.fetchRecipes();
    else return recipes;
  }
}
