import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  ingredientsChanged = new EventEmitter<Ingredient[]>(); //نعرف التغير في الليستة من نوع ايفنت

  getIngredient() {
    return this.ingredients.slice(); //الارراي ده نسخة لو ضفت فيه مش هيظهر التغير
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice()); //نباصي التغير ده للارراي
  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice()); //نباصي التغير ده للارراي
  }
}
