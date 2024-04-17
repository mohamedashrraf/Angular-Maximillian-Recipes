import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';

@Injectable({providedIn: 'root'})

export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService) { }
 storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-max-recipes1-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-max-recipes1-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []

            };
          });
        }),

        tap(recipes => {
          this.recipeService.setRecipes(recipes);
                    console.log(recipes)

        })
      );

  }

}
