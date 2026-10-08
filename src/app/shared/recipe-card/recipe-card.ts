import { Component, computed, input, output } from '@angular/core';
import { RecipeSummary } from '../../core/models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-recipe-card',
  styleUrl: './recipe-card.scss',
  templateUrl: './recipe-card.html',
})
export class RecipeCard {
  readonly recipe = input.required<RecipeSummary>();
  readonly isFavorite = input(false);

  readonly favoriteToggled = output<string>();

  protected readonly favoriteLabel = computed(() =>
    this.isFavorite()
      ? `Remove ${this.recipe().name} from favorites`
      : `Save ${this.recipe().name} to favorites`,
  );

  protected readonly heartIcon = computed(() =>
    this.isFavorite() ? 'icons/active_favorite.svg' : 'icons/favorite.svg',
  );
}
