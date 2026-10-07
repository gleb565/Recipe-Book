import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-search-bar',
  styleUrl: './search-bar.scss',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  readonly initialQuery = input<string>('');
  readonly searched = output<string>();
  readonly randomRequested = output<void>();

  protected onSubmit(event: Event, value: string) {
    event.preventDefault();
    this.searched.emit(value.trim());
  }
}
