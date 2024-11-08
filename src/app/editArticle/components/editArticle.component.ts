import {Component, OnInit} from '@angular/core';
import {ArticleFormValuesInterface} from '../../shared/components/articleForm/types/articleFormValues.interface';
import {ArticleFormComponent} from '../../shared/components/articleForm/articleForm.component';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable} from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} from '../store/reducers';
import {ArticleRequestInterface} from '../../shared/types/articleRequest.interface';
import {editArticleActions} from '../store/actions';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from '../../shared/components/loading/loading.component';
import {ActivatedRoute} from '@angular/router';
import {ArticleInterface} from '../../shared/types/article.interface';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
})
export class EditArticleComponent implements OnInit {
  initialValues$;
  data$;
  slug;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.initialValues$ = this.store.pipe(
      select(selectArticle),
      filter((article): article is ArticleInterface => article !== null),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
      isLoading: this.store.select(selectIsLoading),
      initialValues: this.initialValues$,
    });
  }

  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug: this.slug}));
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(
      editArticleActions.updateArticle({request, slug: this.slug})
    );
  }
}
