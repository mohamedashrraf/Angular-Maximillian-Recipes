import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService) { }
  storeRecipes(){
    const recipes=this.recipeService.getRecipes();
    return this.http.put('https://angular-max-recipes1-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
      response => {console.log(response);})
  }

  fetchRecipes(){
    this.http.get<Recipe[]>('https://angular-max-recipes1-default-rtdb.firebaseio.com/recipes.json').pipe(
      map(resipes=>{ //بتاعت انجولر
        return resipes.map(recipe =>{ //map بتاعت الجافاسكريبت زي اللوب
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} //عشان الانجريدنت تتخزن في الداتا بيز
        })
      }))
      .subscribe(
      recipes =>{
      this.recipeService.setRecipes(recipes);
      })
  }
}
