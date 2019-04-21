import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // recipeClicked: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {


  //   this.recipeService.onRecipeClick.
  //     subscribe(
  //       (recipe: Recipe) => this.recipeClicked = recipe      
  //     );
  }

  // recipeClicked3(recipe: Recipe){
  //   this.recipeClicked = recipe;
  // }

}
