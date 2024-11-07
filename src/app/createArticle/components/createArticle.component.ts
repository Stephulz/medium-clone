import {Component} from '@angular/core';
import {ArticleFormValuesInterface} from '../../shared/components/articleForm/types/articleFormValues.interface';
import {ArticleFormComponent} from '../../shared/components/articleForm/articleForm.component';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {selectIsSubmitting, selectValidationErrors} from '../store/reducers';
import {ArticleRequestInterface} from '../../shared/types/articleRequest.interface';
import {createArticleActions} from '../store/actions';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$;
  constructor(private store: Store) {
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface): void {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    };
    this.store.dispatch(createArticleActions.createArticle({request}));
  }
}
