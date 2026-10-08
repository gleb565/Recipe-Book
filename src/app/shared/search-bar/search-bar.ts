import { Component, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, map } from 'rxjs';

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

  private readonly typed$ = new Subject<string>();

  constructor() {
    this.typed$
      .pipe(
        map((value) => value.trim()),
        debounceTime(300),
        takeUntilDestroyed(),
      )
      .subscribe((value) => this.searched.emit(value));
  }

  protected onInput(value: string): void {
    this.typed$.next(value);
  }

  protected onSubmit(event: Event, value: string) {
    event.preventDefault();
    this.searched.emit(value.trim());
  }
}
