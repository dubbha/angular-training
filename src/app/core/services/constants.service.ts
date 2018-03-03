import { InjectionToken } from '@angular/core';

export const constants = {
  pi: 3.141592653589793238462643383279502884197169399375105820974944,
};

export const ConstantsService = new InjectionToken<object>('constants');
