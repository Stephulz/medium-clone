import {createFeature, createReducer, on} from '@ngrx/store';
import {routerNavigatedAction} from '@ngrx/router-store';
import {FeedStateInterface} from '../types/feedState.interface';
import {feedActions} from './actions';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(feedActions.getFeedSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(feedActions.getFeedFailure, (state, action) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, (state) => ({
      ...state,
      initialState,
    }))
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = authFeature;
