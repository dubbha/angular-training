import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { AppState, rootReducers } from './+store';

import { RouterLinkStubDirective, RouterOutletStubComponent } from './testing-helpers';
import { AppComponent } from './app.component';

import { ConstantsService } from './core/services';

@Component({ selector: 'app-auth', template: '' })
export class AppAuthStubComponent { }

const constantsServiceStub = { pi: 3.1415 };

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;
let elImg: HTMLImageElement;

const initState = {
  appSettings: {
    settings: {
      title: 'Test Title',
      version: 1,
    }
  }
};

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          rootReducers,
          { initialState: <Partial<AppState>>initState },
        ),
      ],
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent,
        AppAuthStubComponent,
      ],
      providers: [
        { provide: ConstantsService, useValue: constantsServiceStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2015, 2, 8, 18, 30));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('logo', () => {
    it('should have an \'Angular\' alt text', () => {
      de = fixture.debugElement.query(By.css('img'));
      elImg = de.nativeElement;

      expect(elImg.alt).toBe('Angular');
    });

    it('should have a correct class name', () => {
      de = fixture.debugElement.query(By.css('img'));
      elImg = de.nativeElement;

      expect(elImg.className).toBe('app__logo');
    });

    it('should be an inline svg image', () => {
      de = fixture.debugElement.query(By.css('img'));
      elImg = de.nativeElement;

      expect(elImg.src).toMatch(/^data\:image\/svg\+xml;base64,*/);
    });
  });

  describe('text block near logo', () => {
    it('should contain title from AppSettingsService', () => {
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('span'));
      el = de.nativeElement;

      expect(el.innerText).toContain('Test Title');
    });

    it('should contain version from AppSettingsService formatted correctly', () => {
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('span'));
      el = de.nativeElement;

      expect(el.innerText).toContain('ver 1.0');
    });

    it('should contain pi value from ConstantsService and formatted correctly', () => {
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('span'));
      el = de.nativeElement;

      expect(el.innerText).toContain('𝛑: 3.14');
    });

    it('should contain clock date formatted correctly', () => {
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('span'));
      el = de.nativeElement;

      expect(el.innerText).toContain('08.03.15');
    });

    it('should contain clock time formatted correctly', () => {
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('span'));
      el = de.nativeElement;

      expect(el.innerText).toContain('18:30:00');
    });

    it('should display next second correctly', () => {
      jasmine.clock().tick(1000);
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('span'));
      el = de.nativeElement;

      expect(el.innerText).toContain('18:30:01');
    });
  });
});
