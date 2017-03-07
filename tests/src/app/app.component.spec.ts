import {TestBed, async} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {MoneyInput} from 'money-input';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MoneyInput
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

  it('should render an input tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    let testComponent: HTMLInputElement = compiled.querySelector('input')


    expect(testComponent).toBeTruthy();
    testComponent.value = "1000"
    testComponent.dispatchEvent(new Event("keyup"))
    setTimeout(function () {
      fixture.detectChanges();

      expect(testComponent.value).toBe("1000");

    }, 0)

  }));
});
document.querySelector('')
