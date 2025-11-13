import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Item } from '../../services/items.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  animations: [
    trigger('cardHover', [
      transition(':enter', [
        style({ transform: 'scale(1)' }),
        animate('200ms', style({ transform: 'scale(1.02)' }))
      ])
    ])
  ]
})
export class ItemCard {
  @Input() item!: Item;
}
