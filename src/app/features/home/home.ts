import { Component, inject, signal } from '@angular/core';

import { RecipeSummary } from '../../core/models/recipe.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { RecipesService } from '../../core/services/recipes.services';
import { CategoryList } from '../../shared/category-list/category-list';
import { RecipeCard } from '../../shared/recipe-card/recipe-card';
import { SearchBar } from '../../shared/search-bar/search-bar';

const ALL = 'All';

type Status = 'loading' | 'success' | 'error';

@Component({
  selector: 'app-home',
  imports: [CategoryList, RecipeCard, SearchBar],
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  private readonly recipesService = inject(RecipesService);
  private readonly favoritesService = inject(FavoritesService);

  protected readonly recipes = signal<RecipeSummary[]>([]);
  protected readonly categories = signal<string[]>([ALL]);
  protected readonly selectedCategory = signal(ALL);
  protected readonly query = signal('');
  protected readonly status = signal<Status>('loading');

  constructor() {
    this.recipesService.getCategories().subscribe((list) => this.categories.set([ALL, ...list]));
    this.reload();
  }

  protected reload(): void {
    const category = this.selectedCategory();
    const request$ =
      category === ALL
        ? this.recipesService.search(this.query())
        : this.recipesService.getByCategory(category);

    this.status.set('loading');
    request$.subscribe({
      next: (list) => {
        this.recipes.set(list);
        this.status.set('success');
      },
      error: () => this.status.set('error'),
    });
  }

  protected onSearched(text: string): void {
    this.query.set(text);
    this.selectedCategory.set(ALL);
    this.reload();
  }

  protected onCategorySelected(category: string): void {
    this.selectedCategory.set(category);
    this.query.set('');
    this.reload();
  }

  protected onRandomRequested(): void {
    this.recipesService.getRandom().subscribe({
      next: (recipe) => this.onSearched(recipe.name),
      error: () => this.status.set('error'),
    });
  }

  protected isFavorite(id: string): boolean {
    return this.favoritesService.isFavorite(id);
  }

  protected onFavoriteToggle(id: string): void {
    this.favoritesService.toggle(id);
  }
}
