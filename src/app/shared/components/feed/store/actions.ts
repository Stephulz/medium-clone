import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get feed': props<{url: String}>(),
    'Get feed success': props<{feed: GetFeedResponseInterface}>(),
    'Get feed failure': emptyProps(),
  },
});
