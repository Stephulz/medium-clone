import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {AddToFavoritesService} from '../services/addtoFavorites.service';
import {addToFavoritesActions} from './actions';
import {ArticleInterface} from '../../../types/article.interface';

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? addToFavoritesService.addToFavorites(slug)
          : addToFavoritesService.removeToFavorites(slug);
        return article$.pipe(
          map((response: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({
              article: response,
            });
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
