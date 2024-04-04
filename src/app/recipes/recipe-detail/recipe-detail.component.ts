// import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {

  @Input() recipe!: Recipe;
    // activeId : string = '';

  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) { }
  // constructor(private slService:ShoppingListService){} ممكن استخدم السيرفس دي علطول

ngOnInit(): void {
  //  this.activeId = this.activeRoute.snapshot.params['id'];

}
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    // this.slService.addIngredients(this.recipe.ingredients);

  }
}
