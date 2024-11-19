import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {map, Observable} from 'rxjs';
import {ArticleInterface} from '../../../types/article.interface';
import {ArticleResponseInterface} from '../../../types/articleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}
  addToFavorites(slug: String): Observable<ArticleInterface> {
    const fullUrl = this.getUrl(slug);
    return this.http
      .post<ArticleResponseInterface>(fullUrl, {})
      .pipe(map(this.getArticle));
  }
  removeToFavorites(slug: String): Observable<ArticleInterface> {
    const fullUrl = this.getUrl(slug);
    return this.http
      .delete<ArticleResponseInterface>(fullUrl)
      .pipe(map(this.getArticle));
  }

  getUrl(slug: String): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
