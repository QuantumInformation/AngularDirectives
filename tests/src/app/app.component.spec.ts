import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MoneyInput } from 'money-input';

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

    let c = new MoneyInput()
    let event = {
      target: {
        value: '1000',
        keyCode: ''
      }
    }

    c.onKeyUp(event as any)

    expect(c['formattedValue']).toBe("1,000");

  }));
});
