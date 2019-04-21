// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  showDropdown: boolean = false;
  // @Output() menuClicked = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private shoppingListServce: ShoppingListService) { }

  ngOnInit() {
  }

  //HamburgerIcon Behaviour
  toggleCollapse(){
    this.show = !this.show;
  }

  //Dropdown Behaviour for 'Menage' button
  onShowDropdown(){
    this.showDropdown = !this.showDropdown;
  }
  
  // onMenuSelect(menuOption: string){
  //   this.menuClicked.emit(menuOption);
  // }

  onSaveData(){

    this.dataStorageService.saveRecipeData()
      .subscribe(
        (response: Recipe[]) => console.log(response),
        (error: HttpErrorResponse) => console.log(error),
        () => console.log('Put request (recipes) completed')
      );

    this.dataStorageService.saveShoppingListData()
        .subscribe(
          (response: Ingredient[]) => console.log(response),
          (error: HttpErrorResponse) => console.log(error),
          () => console.log('Put request (Shopping List) completed')
        );

    this.onShowDropdown();
  }

  onGetData(){

    this.dataStorageService.getRecipeData()
      .pipe(map(
        (response: Recipe[]) => {
          if(!response){
            return [];
          }
          for(const recipe of response){
            if(!recipe['ingredients']){
              console.log(response);
              recipe['ingredients'] = [];
            }
          }
          return response;
        }
      ))
      .subscribe(
        (response: Recipe[]) => {
          console.log(response);
          this.recipeService.setRecipes(response);
        },
        (error: HttpErrorResponse) => console.log(error),
        () => console.log('Get request completed')
      );
    
    this.dataStorageService.getShoppingListData()
      .pipe(map(
        (response: Ingredient[]) => response ? response : [] 
      ))
      .subscribe(
        (response: Ingredient[]) => {
          console.log(response);
          this.shoppingListServce.setIngredients(response);
        },
        (error: HttpErrorResponse) => console.log(error),
        () => console.log('Get request (Shopping List) completed')
      );

    this.onShowDropdown();
  }

}
