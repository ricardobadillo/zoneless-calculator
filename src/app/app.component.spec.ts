// Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Componentes.
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    const router = compiled.querySelector('router-outlet');
    expect(router).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');

    const mustHaveClasses =
      'bg-slate-600 flex items-center justify-center min-h-screen min-w-screen p-5'.split(
        ' '
      );
    const divClasses = divElement?.classList.value.split(' ');

    expect(divElement).not.toBeNull();

    mustHaveClasses.forEach((className: string) => {
      expect(divClasses).toContain(className);
    });
  });
});
