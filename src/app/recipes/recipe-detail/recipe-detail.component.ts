import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {

  @Input() recipe!: Recipe;
  constructor(private recipeService: RecipeService) { }
  // constructor(private slService:ShoppingListService){} ممكن استخدم السيرفس دي علطول


  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    // this.slService.addIngredients(this.recipe.ingredients);

  }
}
