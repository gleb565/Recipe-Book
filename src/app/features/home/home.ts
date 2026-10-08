import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';

import { RecipeSummary } from '../../core/models/recipe.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { RecipesService } from '../../core/services/recipes.services';
import { CategoryList } from '../../shared/category-list/category-list';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { SearchBar } from '../../shared/search-bar/search-bar';

const ALL = 'All';

@Component({
  selector: 'app-home',
  imports: [CategoryList, RecipeCard, SearchBar],
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  private readonly recipesService = inject(RecipesService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  readonly q = input<string>();
  readonly category = input<string>();

  protected readonly query = computed(() => this.q() ?? '');
  protected readonly selectedCategory = computed(() => this.category() ?? ALL);

  protected readonly categories = toSignal(
    this.recipesService.getCategories().pipe(
      map((list) => [ALL, ...list]),
      catchError(() => of([ALL])),
    ),
    { initialValue: [ALL] },
  );

  protected readonly recipes = toSignal(
    toObservable(computed(() => ({ query: this.query(), category: this.selectedCategory() }))).pipe(
      switchMap(({ query, category }) =>
        (category === ALL
          ? this.recipesService.search(query)
          : this.recipesService.getByCategory(category)
        ).pipe(catchError(() => of([] as RecipeSummary[]))),
      ),
    ),
    { initialValue: [] as RecipeSummary[] },
  );

  protected onSearched(text: string): void {
    this.router.navigate([], {
      queryParams: { q: text || null, category: null },
      replaceUrl: true,
    });
  }

  protected onCategorySelected(category: string): void {
    this.router.navigate([], {
      queryParams: { category: category === ALL ? null : category, q: null },
    });
  }

  protected onRandomRequested(): void {
    this.recipesService
      .getRandom()
      .subscribe((recipe) => this.router.navigate(['/recipe', recipe.id]));
  }

  protected isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  protected onFavoriteToggle(id: string): void {
    this.favoritesService.toggle(id);
  }
}
