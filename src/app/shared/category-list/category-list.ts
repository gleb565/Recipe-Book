import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryList {
  readonly categories = input.required<string[]>();
  readonly selected = input.required<string>();

  readonly categorySelected = output<string>();
}
