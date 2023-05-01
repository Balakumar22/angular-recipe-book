import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() id: number;
  // @Output() selectItem = new EventEmitter<Recipe>();

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // onSelect() {
  //   this.router.navigate([this.id], { relativeTo: this.route });
  //   // this.recipesService.recipeSelected.emit(this.recipe);
  // }
}
