import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly _ids = signal<string[]>([]);

  readonly ids = this._ids.asReadonly();
  readonly count = computed(() => this._ids().length);

  isFavorite(id: string): boolean {
    return this._ids().includes(id);
  }

  toggle(id: string): void {
    this._ids.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  clear(): void {
    this._ids.set([]);
  }
}
