// import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {

  recipe!: Recipe;
  id!: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,  private router: Router) { }
  // constructor(private slService:ShoppingListService){} ممكن استخدم السيرفس دي علطول

  ngOnInit(): void {
    //  this.activeId = this.activeRoute.snapshot.params['id']; طريقة 1 تشتغل لاول مرة تحمل الديتلز لما يكون عندي صفحة هوم ادخل منها علي الديتلز ولما اعموز ادخل علي ديتيلز حاجة تانية برجع للهوم الاول
    // طريقة 2 عندي الهوم تعتبر واخدة الشمال من الصفحة لما بدوس علي ديتيلز يعرضها علي الجزء اليمين ولما ادوش علي ديتيلز حاجة تانية واستخدمت الطريقة الاول مش هتنفع الباث هيبوظ عشان هو جواه اي دي الديتيلز الاولي
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );

  }
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    // this.slService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
