import {CommonModule} from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {ErrorMessageComponent} from '../errorMessage/errorMessage.component';
import {LoadingComponent} from '../loading/loading.component';
import {PaginationComponent} from '../pagination/pagination.component';
import {feedActions} from './store/actions';
import {selectError, selectFeedData, selectIsLoading} from './store/reducers';
import {environment} from '../../../../environments/environment';
import queryString from 'query-string';
import {TagListComponent} from '../tagList/tagList.component';
import {AddTofavoritesComponent} from '../addToFavorites/addToFavorites.component';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddTofavoritesComponent,
  ],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';

  data$;
  limit = environment.limit;
  baseUrl;
  currentPage: number = 0;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      feed: this.store.select(selectFeedData),
    });
    this.baseUrl = this.router.url.split('?')[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;

    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('params', params);
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset: offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(feedActions.getFeed({url: apiUrlWithParams}));
  }
}
