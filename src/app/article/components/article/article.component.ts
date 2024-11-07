import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BackendErrorsMessages} from '../../../shared/components/backendErrorsMessages/backendErrorsMessages.component';
import {articleActions} from '../../store/actions';
import {combineLatest, filter, map} from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {TagListComponent} from '../../../shared/components/tagList/tagList.component';
import {ErrorMessageComponent} from '../../../shared/components/errorMessage/errorMessage.component';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    ErrorMessageComponent,
    TagListComponent,
    LoadingComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug;
  data$;
  isAuthor$;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.isAuthor$ = combineLatest({
      article: this.store.select(selectArticleData),
      currentUser: this.store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUserInterface | null =>
              currentUser !== undefined
          )
        ),
    }).pipe(
      map(({article, currentUser}) => {
        if (!article || !currentUser) {
          return false;
        }
        return article.author.username === currentUser.username;
      })
    );
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      error: this.store.select(selectError),
      article: this.store.select(selectArticleData),
      isAuthor: this.isAuthor$,
    });
  }

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug: this.slug}));
  }

  deleteArticle(): void {
    this.store.dispatch(articleActions.deleteArticle({slug: this.slug}));
  }
}
