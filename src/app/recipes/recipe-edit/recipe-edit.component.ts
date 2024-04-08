import { RecipeService } from './../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent {

  id!: number;
  editMode!: boolean;
  recipeForm!: FormGroup;


  constructor(private route: ActivatedRoute, private recipeService:RecipeService, private router:Router){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; //بشوف الاي دي لو ب null ولا لا ويخزن القيمة في
      //params['id'] == null => false
      //params['id'] != null => true
      this.initForm();
    })
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    // console.log("onSubmit");
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel()
  }

  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

private initForm() {
  let recipeName = '';
  let recipeImagePath = '';
  let recipeDescription = '';
  let recipeIngredients: FormGroup[] = [];

  if (this.editMode) {
    const recipe = this.recipeService.getRecipe(this.id);
    recipeName = recipe.name;
    recipeImagePath = recipe.imagePath;
    recipeDescription = recipe.description;
    if (recipe['ingredients']) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      }
    }
  }

  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName),
    'imagePath': new FormControl(recipeImagePath),
    'description': new FormControl(recipeDescription),
    'ingredients': new FormArray(recipeIngredients) // Use FormArray directly
  });
}

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }


 onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
