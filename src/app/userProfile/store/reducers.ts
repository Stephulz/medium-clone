import {createFeature, createReducer, on} from '@ngrx/store';
import {routerNavigatedAction} from '@ngrx/router-store';
import {UserProfileStateInterface} from '../types/userProfileState';
import {userProfileActions} from './actions';

const initialState: UserProfileStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(userProfileActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.userProfile,
    })),
    on(userProfileActions.getUserProfileFailure, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature;
