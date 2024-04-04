import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe('1','Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 1)]),
    new Recipe('2','Big Fat Burger', 'What else you need to say?', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [new Ingredient('chicken', 2), new Ingredient('Fries', 1)])
  ];
  recipeSelected = new Subject<Recipe>();
  constructor(private slService:ShoppingListService) { }
  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients :Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
