import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemsService, Item } from '../../services/items.service';
import { ItemCard } from '../item-card/item-card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  loading = false;
  searchQuery = '';
  page = 0;

  // Static products to display immediately
  private staticProducts: Item[] = [
    {
      id: 1,
      title: 'Rhondda Quartz Black Official Model Chair',
      description: 'Comfortable and stylish office chair with ergonomic design',
      price: 20.00,
      discountPercentage: 10,
      rating: 4.5,
      stock: 20,
      brand: 'Furniture Co',
      category: 'furniture',
      thumbnail: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300',
      images: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600']
    },
    {
      id: 2,
      title: 'Apple T Pro Original Airpod Collection',
      description: 'Premium wireless earbuds with noise cancellation',
      price: 199.99,
      discountPercentage: 15,
      rating: 4.8,
      stock: 50,
      brand: 'Apple',
      category: 'electronics',
      thumbnail: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300',
      images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600']
    },
    {
      id: 3,
      title: 'Professional DSLR Camera',
      description: 'High-resolution camera perfect for photography enthusiasts',
      price: 899.99,
      discountPercentage: 20,
      rating: 4.7,
      stock: 15,
      brand: 'Camera Pro',
      category: 'electronics',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244b32a?w=300',
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244b32a?w=600']
    },
    {
      id: 4,
      title: 'Smart Watch Pro Series',
      description: 'Fitness tracking smartwatch with health monitoring',
      price: 299.99,
      discountPercentage: 25,
      rating: 4.6,
      stock: 30,
      brand: 'TechWear',
      category: 'electronics',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600']
    },
    {
      id: 5,
      title: 'Wireless Bluetooth Speaker',
      description: 'Portable speaker with 360-degree sound and long battery life',
      price: 79.99,
      discountPercentage: 12,
      rating: 4.4,
      stock: 40,
      brand: 'SoundMax',
      category: 'electronics',
      thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300',
      images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600']
    },
    {
      id: 6,
      title: 'Modern Coffee Table',
      description: 'Sleek glass and metal coffee table for modern living spaces',
      price: 249.99,
      discountPercentage: 18,
      rating: 4.5,
      stock: 12,
      brand: 'HomeStyle',
      category: 'furniture',
      thumbnail: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=300',
      images: ['https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600']
    },
    {
      id: 7,
      title: 'Gaming Mechanical Keyboard',
      description: 'RGB backlit keyboard with mechanical switches for gaming',
      price: 129.99,
      discountPercentage: 20,
      rating: 4.7,
      stock: 25,
      brand: 'GameTech',
      category: 'electronics',
      thumbnail: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300',
      images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600']
    },
    {
      id: 8,
      title: 'Leather Office Desk',
      description: 'Executive desk with leather top and spacious drawers',
      price: 599.99,
      discountPercentage: 15,
      rating: 4.6,
      stock: 8,
      brand: 'OfficePro',
      category: 'furniture',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600']
    },
    {
      id: 9,
      title: 'Wireless Mouse Pro',
      description: 'Ergonomic wireless mouse with precision tracking',
      price: 49.99,
      discountPercentage: 10,
      rating: 4.5,
      stock: 60,
      brand: 'TechAccess',
      category: 'electronics',
      thumbnail: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
      images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=600']
    },
    {
      id: 10,
      title: 'Comfortable Sofa Set',
      description: '3-seater sofa with matching cushions and modern design',
      price: 799.99,
      discountPercentage: 22,
      rating: 4.8,
      stock: 5,
      brand: 'ComfortHome',
      category: 'furniture',
      thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300',
      images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600']
    }
  ];

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    // Load static products immediately
    this.items = [...this.staticProducts];
    // Then try to load from API
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.itemsService.getItems(this.searchQuery, this.page).subscribe({
      next: (data) => {
        // If API returns data, use it; otherwise keep static products
        if (data && data.length > 0) {
          this.items = data;
        } else if (this.items.length === 0) {
          // Only use static products if we have no items
          this.items = [...this.staticProducts];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading items:', error);
        // Keep static products if API fails
        if (this.items.length === 0) {
          this.items = [...this.staticProducts];
        }
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.page = 0;
    // If search query is empty, show static products
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.items = [...this.staticProducts];
      this.loading = false;
    } else {
      this.loadItems();
    }
  }

  loadMore() {
    this.page++;
    this.loading = true;
    this.itemsService.getItems(this.searchQuery, this.page).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.items = [...this.items, ...data];
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading more items:', error);
        this.loading = false;
      }
    });
  }
}
