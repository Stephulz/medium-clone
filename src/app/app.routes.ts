import {Routes} from '@angular/router';
import {loginRoutes, registerRoutes} from './auth/auth.routes';
import {globalFeedRoutes} from './globalFeed/globalFeed.routes';
import {yourFeedRoutes} from './yourFeed/yourFeed.routes';
import {tagFeedRoutes} from './tagFeed/tagFeed.routes';
import {articleRoutes} from './article/article.routes';
import {createArticleRoutes} from './createArticle/createArticle.routes';
import {editArticleRoutes} from './createArticle copy/editArticle.routes';

export const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => registerRoutes,
  },
  {
    path: 'login',
    loadChildren: () => loginRoutes,
  },
  {
    path: '',
    loadChildren: () => globalFeedRoutes,
  },
  {
    path: 'feed',
    loadChildren: () => yourFeedRoutes,
  },
  {
    path: 'tags/:slug',
    loadChildren: () => tagFeedRoutes,
  },
  {
    path: 'articles/new',
    loadChildren: () => createArticleRoutes,
  },
  {
    path: 'articles/:slug',
    loadChildren: () => articleRoutes,
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () => editArticleRoutes,
  },
];
