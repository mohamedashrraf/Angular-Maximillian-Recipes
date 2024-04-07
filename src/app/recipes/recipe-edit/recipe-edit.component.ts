import { RecipeService } from './../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent {

  id!: number;
  editMode!: boolean;
  recipeForm!: FormGroup;


  constructor(private route: ActivatedRoute, private recipeService:RecipeService){}

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
    console.log("onSubmit");
  }
 private initForm() {
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
    }

    this.recipeForm=new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath':new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    })
  }
}
