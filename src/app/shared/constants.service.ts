import { InjectionToken } from '@angular/core';

export const constants = {
  title: 'Angular Training',
  version: '4.0'
};

export const ConstantsService = new InjectionToken<object>('constants');
