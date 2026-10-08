import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  protected readonly favoriteServices = inject(FavoritesService);
}
