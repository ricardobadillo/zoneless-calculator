// Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Componentes.
import { CalculatorComponent } from './calculator.component';

// Servicios.
import { CalculatorService } from '../../services/calculator.service';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');
    fixture.detectChanges();

    expect(compiled.querySelector('span')?.innerText).toBe('456 *');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content projection', () => {
    // const buttonsByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));
    const buttons = compiled.querySelectorAll('app-calculator-button');

    expect(buttons.length).toBe(19);
    expect(buttons[0].textContent?.trim()).toBe('AC');
  });

  it('should handle keyboard events correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEscape);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('AC');
  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('5');
    mockCalculatorService.subResultText.and.returnValue('5');
    mockCalculatorService.lastOperator.and.returnValue('+');
    fixture.detectChanges();
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('5 +');
  });
});
