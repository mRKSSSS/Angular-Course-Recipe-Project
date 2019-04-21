import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class DataStorageService{

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private shoppingListservice: ShoppingListService){}

    saveRecipeData(){
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.put('https://ng-recipe-book-527a4.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {headers: headers});
    }

    getRecipeData(){
        return this.http.get('https://ng-recipe-book-527a4.firebaseio.com/recipes.json');
    }

    saveShoppingListData(){
        const headers = new HttpHeaders({'Content-Type': 'applications/json'});
        return this.http.put('https://ng-recipe-book-527a4.firebaseio.com/shopping-list.json', this.shoppingListservice.getIngredients(), {headers: headers});
    }

    getShoppingListData(){
        return this.http.get('https://ng-recipe-book-527a4.firebaseio.com/shopping-list.json');
    }

}