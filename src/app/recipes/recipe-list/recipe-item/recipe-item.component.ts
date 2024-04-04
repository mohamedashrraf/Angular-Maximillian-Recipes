import { Router } from '@angular/router';
import { RecipeService } from './../../recipe.service';
import { Component, Input  } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {

  @Input() recipe?: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  // id!: string;

  constructor (private recipeService:RecipeService, private router: Router){}

  onSelected(id: string) {
    // this.recipeSelected.emit();
    // this.recipeService.recipeSelected.emit(this.recipe);

    // this.router.navigate(['recipe', id]);
  }
}
