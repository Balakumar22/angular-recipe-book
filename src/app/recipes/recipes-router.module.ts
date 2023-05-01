import { Route, RouterModule } from '@angular/router';
import { AuthGaurd } from '../auth/auth-guard.service';
import { RecipeResolveService } from '../shared/recipe-resolve.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';

const recipesRoute: Route[] = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGaurd],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolveService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolveService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoute)],
  exports: [RouterModule],
})
export class RecipesRouterModule {}
