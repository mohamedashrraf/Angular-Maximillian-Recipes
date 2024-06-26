import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{ //لما اضيف ريسبي يسمع ويضيفه في قائمة ال recipes
      this.recipes=recipes;
    })
  }
  // onRecipeSelected(recipe:Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
