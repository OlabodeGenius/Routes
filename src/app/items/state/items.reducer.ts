import { createReducer, on } from '@ngrx/store';
import { Item } from '../../services/items.service';
import * as ItemsActions from './items.actions';

export const STATIC_PRODUCTS: Item[] = [
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

export interface ItemsState {
    items: Item[];
    selectedItem: Item | null;
    loadingList: boolean;
    loadingDetail: boolean;
    errorList: string | null;
    errorDetail: string | null;
}

export const initialState: ItemsState = {
    items: [...STATIC_PRODUCTS],
    selectedItem: null,
    loadingList: false,
    loadingDetail: false,
    errorList: null,
    errorDetail: null,
};

export const itemsReducer = createReducer(
    initialState,
    on(ItemsActions.loadItems, (state) => ({
        ...state,
        loadingList: true,
        errorList: null,
    })),
    on(ItemsActions.loadItemsSuccess, (state, { items, page }) => {
        // If page is 0, replace items. If page > 0, append items.
        // Also, if page is 0 and items are empty, we might want to keep static products?
        // The requirement was "Only use static products if we have no items".
        // If we are searching (page 0) and find nothing, we should probably show nothing.
        // But if we are loading initial list (page 0, no query) and it fails, we keep static.
        // Here we are in SUCCESS. So API returned something (or empty).
        // If we want to strictly follow "If API returns data, use it", then we use it.
        // If API returns empty, we use empty.
        // The static products are only for INITIAL state or FAILURE.

        const newItems = page === 0 ? items : [...state.items, ...items];

        return {
            ...state,
            items: newItems,
            loadingList: false,
        };
    }),
    on(ItemsActions.loadItemsFailure, (state, { error }) => ({
        ...state,
        errorList: error,
        loadingList: false,
        // On failure, we keep existing items (which might be static products)
    })),
    on(ItemsActions.loadItem, (state) => ({
        ...state,
        loadingDetail: true,
        errorDetail: null,
        selectedItem: null,
    })),
    on(ItemsActions.loadItemSuccess, (state, { item }) => ({
        ...state,
        selectedItem: item,
        loadingDetail: false,
    })),
    on(ItemsActions.loadItemFailure, (state, { error }) => ({
        ...state,
        errorDetail: error,
        loadingDetail: false,
    }))
);
