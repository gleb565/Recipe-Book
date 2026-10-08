import { Injectable } from '@angular/core';
import { RECIPES_MOCK } from '../mocks/recipes.mock';
import { RecipeSummary } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  getAll(): RecipeSummary[] {
    return RECIPES_MOCK;
  }

  getById(id: string): RecipeSummary | undefined {
    return RECIPES_MOCK.find((recipe) => recipe.id === id);
  }
}
