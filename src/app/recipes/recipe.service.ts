// import { EventEmitter, Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    // onRecipeClick = new EventEmitter<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Veggie Paella',
            'Test some description',
            'https://www.tasteofhome.com/wp-content/uploads/2017/10/Healthier-than-Egg-Rolls_EXPS_SDON17_55166_C06_23_6b-696x696.jpg',
            [
                new Ingredient('Mixed Vegetables', 1),
                new Ingredient('Mushrooms', 12)
            ]
        ),
        new Recipe(
            'Big Burger',
            'Test some description',
            'https://www.tasteofhome.com/wp-content/uploads/2017/10/exps28800_UG143377D12_18_1b_RMS-696x696.jpg',
            [
                new Ingredient('Bread Buns', 2),
                new Ingredient('Meat', 1)
            ]
            )
        ];
        
        constructor(private shoppingListService: ShoppingListService){}
            
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngToShopList(ingredients: Ingredient[]){
        this.shoppingListService.addIngToShopList(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    };
    
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
    // deleteIngredient(recipeIndex:number, ingredientIndex: number){
        //     this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
        //     this.recipesChanged.next(this.recipes.slice());
        // }
        
}