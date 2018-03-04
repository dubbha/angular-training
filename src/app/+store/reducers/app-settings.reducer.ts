import { AppSettingsActionTypes, AppSettingsActions } from '../actions';
import { AppSettingsState, initialAppSettingsState } from './../state/app-settings.state';
import { AppSettingsService } from '../../core/services/app-settings.service';

export function appSettingsReducer(
  state = initialAppSettingsState,
  action: AppSettingsActions,
): AppSettingsState {
  switch (action.type) {
    case AppSettingsActionTypes.INIT:
      return {
        ...state,
        settings: action.payload,
        initialized: true,
      };

    default: {
      return state;
    }
  }
}
