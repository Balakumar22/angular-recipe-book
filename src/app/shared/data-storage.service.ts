import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  baseUrl: string =
    'https://angular-course-recipe-bo-55843-default-rtdb.asia-southeast1.firebasedatabase.app/';
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    this.http
      .put(`${this.baseUrl}recipes.json`, this.recipesService.getRecipies())
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    // return this.authService.user.pipe(
    //   take(1),
    //   exhaustMap((user) => {
    //     console.log(user);

    //     return this.http.get<Recipe[]>(`${this.baseUrl}recipes.json`, {
    //       params: new HttpParams().set('auth', user.token),
    //     });
    //   }),
    //   map((recipesResponse) => {
    //     return recipesResponse.map((recipe) => {
    //       const ingredients = recipe.ingredients || [];
    //       return { ...recipe, ingredients };
    //     });
    //   }),
    //   tap((recipes) => this.recipesService.setRecipies(recipes))
    // );

    return this.http.get<Recipe[]>(`${this.baseUrl}recipes.json`).pipe(
      map((recipesResponse) => {
        return recipesResponse.map((recipe) => {
          const ingredients = recipe.ingredients || [];
          return { ...recipe, ingredients };
        });
      }),
      tap((recipes) => this.recipesService.setRecipies(recipes))
    );
    // .subscribe((recipes) => this.recipesService.setRecipies(recipes));
  }
}
