import { InjectionToken } from '@angular/core';

export const constants = {
  title: 'Angular Training',
  version: '5.0'
};

export const ConstantsService = new InjectionToken<object>('constants');
