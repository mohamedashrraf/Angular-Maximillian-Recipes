import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService) { }
  storeRecipes(){
    const recipes=this.recipeService.getRecipes();
    return this.http.put('https://angular-max-recipes1-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
      response => {console.log(response);})
  }

  fetchRecipes(){ //ازم تاخد توكين عشان تعرض الداتا للاكونت اللي عمل تسجيل دخول بس
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
          {
            // params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
