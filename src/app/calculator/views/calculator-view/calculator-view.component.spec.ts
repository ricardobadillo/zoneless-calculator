// Angular.
import { ComponentFixture, TestBed } from "@angular/core/testing";

// Componentes.
import CalculatorViewComponent from "./calculator-view.component";

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('app-calculator')).not.toBeNull();
  });

  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');

    const shouldHave = 'bg-gray-100 mx-auto overflow-hidden relative rounded-xl shadow-xl text-gray-800 w-full'.split(' ');

    shouldHave.forEach((cssClass: string) => {
      expect(divClasses).toContain(cssClass);
    });
  });
});
