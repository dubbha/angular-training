export interface AppSettingsState {
  readonly initialized: boolean;
  readonly settings: any;
}

export const initialAppSettingsState = {
  initialized: false,
  settings: null,
};
