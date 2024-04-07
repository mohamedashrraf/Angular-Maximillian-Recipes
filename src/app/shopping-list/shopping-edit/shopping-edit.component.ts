import { Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
    // @ViewChild('nameInput') nameInputRef!: ElementRef;
    // @ViewChild('amountInput') amountInputRef!: ElementRef;
    // @Output() ingredientAdded = new EventEmitter<Ingredient>();

    subscription!:Subscription;
    editMode=false;
    editedItemIndex!:number;
    editedItem!:Ingredient; //العنصر بتاع ال ingredient اللي بجيبه عشان اعدله
    @ViewChild('f') slForm!: NgForm;
  constructor(private slService:ShoppingListService){}

  ngOnInit() {
   this.subscription = this.slService.startedEditing.subscribe((index:number)=>{
        this.editedItemIndex=index; //العنصر اللي بيتعدل
        this.editMode=true; //شغلت وضع التعديل
        this.editedItem=this.slService.getIngredient(index); //بجيب العنصر اللي اتعدل
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
   })
  })

  }
  //عايز لما ادوس علي العنصر في القائمة يحط بياناته في الانبوت عشان يتعدل
  onSubmit(form :NgForm){
    // const newIngredient=new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
      const newIngredient=new Ingredient(form.value.name, form.value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
          this.slService.updateIngredient(this.editedItemIndex, newIngredient); //اعدل
    }else{
    this.slService.addIngredient(newIngredient); //اضيف
    }
    this.editMode=false; //لازم نلغي وضع التعديل بعد مانعدل او نضيف عشان الزرار يعمل add ميفتكرش اللي اللي هضيفه جديد هو تعديل لحاجة قديمة
    form.reset();
  }

  onDelete(){
    this.onClear();
    this.slService.deleteIngredient(this.editedItemIndex);
    this.editMode=false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}
