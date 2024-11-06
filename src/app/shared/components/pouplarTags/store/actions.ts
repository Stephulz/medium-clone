import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {PopularTagType} from '../../../types/popularTag.type';

export const popularTagsActions = createActionGroup({
  source: 'popularTags',
  events: {
    'Get popularTags': emptyProps(),
    'Get popularTags success': props<{popularTags: PopularTagType[]}>(),
    'Get popularTags failure': emptyProps(),
  },
});
