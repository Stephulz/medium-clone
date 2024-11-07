import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../auth/store/reducers';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeedTogglerComponent implements OnInit {
  @Input() tagName?: string;
  currentUser$;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {}
}
