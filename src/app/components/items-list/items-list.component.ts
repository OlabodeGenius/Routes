import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Item } from '../../services/items.service';
import { ItemCard } from '../item-card/item-card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { loadItems } from '../../items/state/items.actions';
import { selectItems, selectLoadingList } from '../../items/state/items.selectors';

@Component({
  selector: 'app-items-list',
  imports: [
    CommonModule,
    ItemCard,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ItemsListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  loading = false;
  searchQuery = '';
  page = 0;
  private subscriptions: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit() {
    // Dispatch loadItems to load initial data (or use static from reducer)
    // If we want to trigger the API call immediately, we dispatch.
    // If we want to just show static first and then load?
    // The reducer has static items initially.
    // If we dispatch loadItems, it will trigger the effect -> API call.
    // While loading, we can show the static items?
    // But loading flag will be true.
    // The template shows spinner if loading && items.length === 0.
    // Since we have static items, items.length > 0. So spinner won't show?
    // Wait, template: <div *ngIf="loading && items.length === 0" class="loading">
    // So if we have items, spinner is hidden.
    // But we might want to show a spinner or something to indicate loading?
    // The current logic was: show static, then load.
    // If I dispatch loadItems, loading becomes true.
    // Items are static.
    // Spinner is hidden.
    // User sees static items.
    // When API returns, items update.
    // This seems correct.

    this.store.dispatch(loadItems({}));

    this.subscriptions.push(
      this.store.select(selectItems).subscribe(items => {
        this.items = items;
      }),
      this.store.select(selectLoadingList).subscribe(loading => {
        this.loading = loading;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSearch() {
    this.page = 0;
    // If search query is empty, we reload all items (or static if API fails/returns empty)
    // The original logic: if empty, show static.
    // Here we just dispatch loadItems. The reducer/effect handles the rest.
    this.store.dispatch(loadItems({ query: this.searchQuery, page: 0 }));
  }

  loadMore() {
    this.page++;
    this.store.dispatch(loadItems({ query: this.searchQuery, page: this.page }));
  }
}
