import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  //  recipes: Recipe[] = [
  //     new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
  //     new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  // ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes!:Recipe[];
  constructor(private recipeService: RecipeService){}

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();

  }
  // onRecipeSelected(recipe:Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

}
