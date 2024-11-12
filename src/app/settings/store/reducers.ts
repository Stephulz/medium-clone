import {createFeature, createReducer, on} from '@ngrx/store';
import {routerNavigatedAction} from '@ngrx/router-store';
import {SettingsStateInterface} from '../types/settingsState.interface';
import {authActions} from '../../auth/store/actions';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state, action) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.updateCurrentUserFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = settingsFeature;
