import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  // ingredientsChanged = new EventEmitter<Ingredient[]>(); //نعرف التغير في الليستة من نوع ايفنت
  ingredientsChanged = new Subject<Ingredient[]>(); //نعرف التغير في الليستة من نوع ايفنت

  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice(); //الارراي ده نسخة لو ضفت فيه مش هيظهر التغير
  }

  getIngredient(index : number){ //يجيب عنصر واحد بالاندكس بتاعه عشان اعدله
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) { //يضيف عنصر واحد ضفته من صفة ال edit
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice()); //نباصي التغير ده للارراي
  }

  addIngredients(ingredient: Ingredient[]) { //يضيف عناصر الارراي كلها اللي موجودة كمكونات في صفحة recipeDetails استدعيها في سيرفس ال recipes
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient: Ingredient){ //تعدل قيمة العنصر نفسه مش تزودها من تحت
    this.ingredients[index]=newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

   deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

