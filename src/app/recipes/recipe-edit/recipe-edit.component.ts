import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent {

  id!: number;
  editMode!: boolean;

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; //بشوف الاي دي لو ب null ولا لا ويخزن القيمة في
      //params['id'] == null => false
      //params['id'] != null => true
    })
  }
}
