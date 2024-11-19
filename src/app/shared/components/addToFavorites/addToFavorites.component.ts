import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {AddToFavoritesService} from './services/addtoFavorites.service';
import {Store} from '@ngrx/store';
import {addToFavoritesActions} from './store/actions';

@Component({
  selector: 'mc-add-to-favorites',
  templateUrl: './addTofavorites.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [AddToFavoritesService],
})
export class AddTofavoritesComponent {
  @Input() isFavorited: boolean = false;
  @Input() favoritesCount: number = 0;
  @Input() articleSlug: string = '';

  constructor(private store: Store) {}

  handleLike(): void {
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }

    this.isFavorited = !this.isFavorited;

    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      })
    );
  }
}
