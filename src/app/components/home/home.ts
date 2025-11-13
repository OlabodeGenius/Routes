import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ItemsService, Item } from '../../services/items.service';
import { ItemCard } from '../item-card/item-card';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatCardModule, ItemCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  featuredItems: Item[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.loadFeaturedItems();
  }

  loadFeaturedItems() {
    this.itemsService.getItems(undefined, 0).subscribe({
      next: (data) => {
        this.featuredItems = (data || []).slice(0, 4);
      },
      error: (error) => {
        console.error('Error loading featured items:', error);
        this.featuredItems = [];
      }
    });
  }
}
