import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent {
  id: number;
  recipe: Recipe;

  open:boolean=false;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipesService.AddIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.open=true;
  }

  confirmBoxHandler(response:boolean){
    if(response){
      this.recipesService.DeleteRecipe(this.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
    else{
      this.open=false;
    }
  }
}
