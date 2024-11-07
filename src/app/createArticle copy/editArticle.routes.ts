import {Route} from '@angular/router';
import * as editArticleEffects from './store/effects';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {EditArticleComponent} from './components/editArticle.component';
import {EditArticleService} from './services/editArticle.service';
import {editArticleFeatureKey, editArticleReducer} from './store/reducers';

export const editArticleRoutes: Route[] = [
  {
    path: '',
    component: EditArticleComponent,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
