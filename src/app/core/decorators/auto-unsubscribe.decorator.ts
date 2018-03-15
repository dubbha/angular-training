import { Subscription } from 'rxjs/Subscription';

export function AutoUnsubscribe(subName: string = 'sub') {
  return function (constructor) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const sub: Subscription  = this[subName];

      if (sub) {
        sub.unsubscribe();
      }

      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);
      }

      // console.log('AutoUnsubscribe decorator is called');
    };
  };
}
