import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {popularTagsActions} from './store/actions';
import {combineLatest} from 'rxjs';
import {
  selectError,
  selectIsLoading,
  selectPopularTagsData,
} from './store/reducers';
import {RouterLink} from '@angular/router';
import {LoadingComponent} from '../loading/loading.component';
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorMessageComponent],
})
export class PopularTagsComponent implements OnInit {
  data$;
  constructor(private store: Store) {
    this.data$ = combineLatest({
      popularTags: this.store.select(selectPopularTagsData),
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags());
  }
}
