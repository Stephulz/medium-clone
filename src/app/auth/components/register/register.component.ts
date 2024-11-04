import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Store} from '@ngrx/store';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {RouterLink} from '@angular/router';
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducers';
import {CommonModule} from '@angular/common';
import {authActions} from '../../store/actions';
import {combineLatest} from 'rxjs';
import {BackendErrorsMessages} from '../../../shared/components/backendErrorsMessages/backendErrorsMessages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorsMessages,
  ],
})
export class RegisterComponent {
  form: FormGroup;
  data$;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      backendErrors: this.store.select(selectValidationErrors),
    });
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({request}));
  }
}
