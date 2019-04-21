// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{

    ingredientsChanged = new Subject<Ingredient[]>();
    ingredientEdit = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Spaghetti', 200),
        new Ingredient('Tomatoes', 10)
    ];

    setIngredients(ingredients: Ingredient[]){
        this.ingredients = ingredients;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients.slice()[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngToShopList(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(newIngredient: Ingredient, index: number){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    clearIngredients(){
        this.ingredients.splice(0, this.ingredients.length);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}