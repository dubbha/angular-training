import { TestBed, ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { Store } from '@ngrx/store';


import { RouterLinkStubDirective, RouterOutletStubComponent, StoreStub } from './testing-helpers';
import { AppComponent } from './app.component';

import { ConstantsService } from './core/services';

@Component({ selector: 'app-auth', template: '' })
export class AppAuthStubComponent { }

const constantsServiceStub = { pi: 3.14 };

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;

const storeStub = new StoreStub({
  settings: {
    title: 'Default Title',
    version: 1,
    cacheTimeToLiveSeconds: 300,
    apiBaseUrl: 'http://127.0.0.1:3000/api',
  }
});

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent,
        AppAuthStubComponent,
      ],
      providers: [
        { provide: ConstantsService, useValue: constantsServiceStub },
        { provide: Store, useValue: storeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should display original title', fakeAsync(() => {
    de = fixture.debugElement.query(By.css('img'));
    expect(de.nativeElement.alt).toBe('Angular');

    tick();
    //fixture.detectChanges();

    // console.log(fixture);
    console.log(component.appSettings$);

    tick();

    // fixture.detectChanges();
    console.log(component.appSettings$);
    console.log(component.pi);

    // fixture.whenStable().then(() => {
    //   console.log('after whenStable');
    //   //console.log(component.pi);
    //   console.log(component.appSettings$);
    //   fixture.detectChanges();
    //   fixture.whenStable().then(() => {
    //     console.log('after second detectChanges');
    //     console.log(component.appSettings$);
    //   });
    //   // console.log(fixture);
    // });


    // fixture.detectChanges();
    // fixture.whenStable().then(() => {
    //   fixture.detectChanges();
    //   expect(de.nativeElement.alt).toBe('Angular');
    // });
  }));
});
