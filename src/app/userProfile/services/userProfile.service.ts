import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserProfileInterface} from '../types/userProfile.interface';
import {map, Observable} from 'rxjs';
import {getUserProfileResponseInterface} from '../types/getUserProfileReponse.interface';

@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(slug: string): Observable<UserProfileInterface> {
    const url = `${environment.apiUrl}/profiles/${slug}`;
    return this.http
      .get<getUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }
}
