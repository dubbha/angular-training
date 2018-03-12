import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../+store';
import * as RouterActions from './../../+store/actions/router.actions';

import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators';

import { ModalService } from '../../shared/services';
import { CartService } from '../../cart/cart.service';
import { CustomValidators } from './validators/custom-validators';
import { AutoUnsubscribe } from '../../core/decorators/auto-unsubscribe.decorator';

@Component({
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
@AutoUnsubscribe()
export class AddressComponent implements OnInit {
  form: FormGroup;
  errors = {};

  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        emailGroup: new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            confirmEmail: new FormControl('', [Validators.required, Validators.email]),
          },
          CustomValidators.emailMatcher,
        ),
        mobiles: new FormArray([
          new FormControl(''),
        ]),
        address: new FormControl(''),
        deliveryRequired: new FormControl(false, { updateOn: 'change' }),
        rulesAccepted: new FormControl(false, {
          validators: Validators.requiredTrue,
          updateOn: 'change',
        }),
      },
      { updateOn: 'blur'},
    );

    this.watchValueChanges();
  }

  get mobiles(): FormArray {                      // need the getter for the prod build not to fail on:
    return <FormArray>this.form.get('mobiles');   // *ngFor="let mobile of form.get('mobiles').controls"
  }

  checkout() {
    if (this.form.valid) {
      this.cartService.clear();
      this.modalService.alert('order processed successfully', {
        style: 'success',
        callback: () => this.store.dispatch(new RouterActions.Go({ path: ['/'] })),
      });
    }
  }

  addMobile() {
    const formArray = (<FormArray>this.form.get('mobiles'));
    const deliveryRequired = this.form.get('deliveryRequired').value;

    if (deliveryRequired) {
      formArray.push(new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+?\d{3})?[\d\-]{9,13}$/)
      ]));
    } else {
      formArray.push(new FormControl(''));
    }

    const idx = formArray.controls.length - 1;

    // Remove spaces from mobile
    this.sub.add(formArray.controls[idx].valueChanges
      .pipe(
        tap(value => {
          if (value.match(/\s/g)) {
            formArray.controls[idx].setValue(value.replace(/\s/g, ''));
          }
        })
      )
      .subscribe(() => this.updateArrayError('mobiles', idx))); // subscribe for future errors

    this.updateArrayError('mobiles', idx);  // set initial error
  }

  deleteMobile(idx: number) {
    (<FormArray>this.form.get('mobiles')).removeAt(idx);
    delete this.errors[`mobiles.${idx}`];
  }

  private watchValueChanges() {
    this.sub = new Subscription();

    // Update errors for the following keys
    const keys = [
      'name',
      'emailGroup',
      'emailGroup.email',
      'emailGroup.confirmEmail',
      'address',
    ];

    keys.forEach(key => {
      this.sub.add(this.form.get(key).valueChanges
        .subscribe(() => this.updateError(key)));

      this.updateError(key);  // set initial error, for required fields to display error message
                              // upon initial touch and blur, without an actual value change
    });

    // Update validators based on delivery requested switch
    this.sub.add(this.form.get('deliveryRequired').valueChanges
      .subscribe(value => this.updateDeliveryValidators(value)));

    // Remove spaces from the first mobile
    const formArray = (<FormArray>this.form.get('mobiles'));
    this.sub.add(formArray.controls[0].valueChanges
      .pipe(
        tap(value => {
          if (value.match(/\s/g)) {
            formArray.controls[0].setValue(value.replace(/\s/g, ''));
          }
        })
      )
      .subscribe(() => this.updateArrayError('mobiles', 0))); // subscribe for future errors

    this.updateArrayError('mobiles', 0);  // set initial error
  }

  private updateError(key) {
    const control = this.form.get(key);
    if (control && control.errors) {
      if (control.errors.required) {
        this.errors[key] = 'Required field';
      } else if (control.errors.email) {
        this.errors[key] = 'Invalid email';
      } else if (control.errors.emailMatch) {
        this.errors[key] = 'Emails do not match';
      } else if (control.errors.pattern) {
        this.errors[key] = 'Invalid format';
      }
    } else {
      this.errors[key] = null;
    }
  }

  private updateArrayError(key, index) {
    const formArray = (<FormArray>this.form.get(key));
    const control = formArray.controls[index];
    const combinedKey = `${key}.${index}`;

    if (control && control.errors) {
      if (control.errors.required) {
        this.errors[combinedKey] = 'Required field';
      } else if (control.errors.pattern) {
        this.errors[combinedKey] = 'Invalid format';
      }
    } else {
      this.errors[combinedKey] = null;
    }
  }

  private updateDeliveryValidators(deliveryRequired) {
    const mobilesArray = (<FormArray>this.form.get('mobiles'));
    const addressControl = this.form.get('address');

    if (deliveryRequired) {
      mobilesArray.controls.forEach(c => c.setValidators([
        Validators.required,
        Validators.pattern(/^(\+?\d{3})?[\d\-]{9,13}$/)
      ]));
      addressControl.setValidators(Validators.required);
    } else {
      mobilesArray.controls.forEach(c => c.clearValidators());
      addressControl.clearValidators();
    }
    mobilesArray.controls.forEach(c => c.updateValueAndValidity());
    addressControl.updateValueAndValidity();
  }
}
