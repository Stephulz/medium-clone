import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser} from '../../../auth/store/reducers';
import {combineLatest, filter, Subscription} from 'rxjs';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {BackendErrorsMessages} from '../../../shared/components/backendErrorsMessages/backendErrorsMessages.component';
import {CurrentUserRequestInterface} from '../../../shared/types/currentUserRequest.interface';
import {authActions} from '../../../auth/store/actions';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [CommonModule, BackendErrorsMessages, ReactiveFormsModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form;
  currentUser?: CurrentUserInterface;
  currentUserSubscription?: Subscription;
  data$;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ['', Validators.required],
    });

    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }
  ngOnDestroy(): void {
    this.currentUserSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.store
      .pipe(select(selectCurrentUser), filter(Boolean))
      .subscribe((currentUser) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }
    this.form.patchValue({
      image: this.currentUser.image ?? '',
      username: this.currentUser.username ?? '',
      bio: this.currentUser.bio ?? '',
      email: this.currentUser.email ?? '',
      password: '',
    });
  }

  submit(): void {
    if (!this.currentUser) {
      throw new Error('current user is not set');
    }

    const currentUserRequest: CurrentUserRequestInterface = {
      user: {
        ...this.currentUser,
        ...this.form.getRawValue(),
      },
    };

    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}));
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
