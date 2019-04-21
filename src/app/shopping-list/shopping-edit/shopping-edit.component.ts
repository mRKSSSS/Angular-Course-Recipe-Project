// import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // ingredientName: string;
  // ingredientAmount: number;
  // @ViewChild('ingredientName') ingredientName: ElementRef;
  // @ViewChild('ingredientAmount') ingredientAmount: ElementRef;
  // @Output() ingredientsAdded = new EventEmitter<Ingredient>(); 

  @ViewChild('f') ingredientForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editIngredientIndex: number;
  editIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientEdit
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editIngredientIndex = index;
          this.editIngredient = this.shoppingListService.getIngredient(index);
          this.ingredientForm.setValue({
            ingredientName: this.editIngredient.name,
            ingredientAmount: this.editIngredient.amount
          });
        }
      );
  }

  // W/ Direct passing of input elements through local ref
  // onIngredientAdd(ingredientName: HTMLInputElement, ingredientAmount: HTMLInputElement){
  //   this.ingredientName = ingredientName.value;
  //   this.ingredientAmount = Number(ingredientAmount.value);
  //   this.ingredientsAdded.emit({
  //     name: this.ingredientName,
  //     amount: this.ingredientAmount
  //   });
  // }

  // W/ ViewChild usage on input elements through local ref
  onSubmitIngredient(form: NgForm){
    // const ingName = this.ingredientName.nativeElement.value;
    // const ingAmount = Number(this.ingredientAmount.nativeElement.value);

    const ingName = form.value.ingredientName;
    const ingAmount = form.value.ingredientAmount;
    const ingredient = new Ingredient(ingName, ingAmount);

    if(!this.editMode){
      // this.ingredientsAdded.emit(ingredient);
      this.shoppingListService.addIngredient(ingredient);
    }else{
      this.shoppingListService.updateIngredient(ingredient, this.editIngredientIndex);
    }
    this.onClearForm();
  }

  onDeleteIngredient(){
    this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    this.onClearForm();
  }

  onClearIngredients(){
    this.shoppingListService.clearIngredients();
    this.onClearForm();
  }

  onClearForm(){
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
