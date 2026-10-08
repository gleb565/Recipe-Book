import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

import { FavoritesService } from '../../core/services/favorites.service';
import { RecipesService } from '../../core/services/recipes.services';

@Component({
  selector: 'app-recipe-details',
  imports: [RouterLink],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  private readonly recipesService = inject(RecipesService);
  protected readonly favoritesService = inject(FavoritesService);

  readonly id = input.required<string>();

  protected readonly recipe = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => this.recipesService.getById(id).pipe(catchError(() => of(null)))),
    ),
  );

  protected toggleFavorite(): void {
    const recipe = this.recipe();
    if (recipe) {
      this.favoritesService.toggle(recipe.id);
    }
  }
}
