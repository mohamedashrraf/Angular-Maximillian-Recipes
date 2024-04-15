import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path:'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent},
    { path: 'new', component: RecipeEditComponent}, //و حطينا الراوت بتاعها تحت راوت الاي دي يعمل ايرور لانه هيفتكر كلمة new هي اي دي
    { path: ':id', component: RecipeDetailComponent }, //لازم الاي دي الداينامك يبقي اخر راوت عشان ميفتكرش الراوت اللي بعده اي دي زيه
    {path:':id/edit', component: RecipeEditComponent}
  ] },
  { path:'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
