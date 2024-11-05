import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {combineLatest} from 'rxjs';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'mc-topbar',
  templateUrl: 'topBar.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class TopBarComponent {
  data$;
  constructor(private store: Store) {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
    });
  }
}
