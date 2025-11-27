import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ItemsService } from '../../services/items.service';
import * as ItemsActions from './items.actions';

@Injectable()
export class ItemsEffects {
    private actions$ = inject(Actions);
    private itemsService = inject(ItemsService);

    loadItems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ItemsActions.loadItems),
            mergeMap((action) =>
                this.itemsService.getItems(action.query, action.page).pipe(
                    map((items) => ItemsActions.loadItemsSuccess({ items, page: action.page || 0 })),
                    catchError((error) =>
                        of(ItemsActions.loadItemsFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    loadItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ItemsActions.loadItem),
            mergeMap((action) =>
                this.itemsService.getItemById(action.id).pipe(
                    map((item) => ItemsActions.loadItemSuccess({ item })),
                    catchError((error) =>
                        of(ItemsActions.loadItemFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}
