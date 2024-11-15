// Servicios.
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    calculatorService = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(calculatorService).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(calculatorService.resultText()).toEqual('0');
    expect(calculatorService.subResultText()).toEqual('0');
    expect(calculatorService.lastOperator()).toEqual('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    calculatorService.resultText.set('123');
    calculatorService.subResultText.set('456');
    calculatorService.lastOperator.set('*');

    calculatorService.constructNumber('AC');

    expect(calculatorService.resultText()).toBe('0');
    expect(calculatorService.subResultText()).toBe('0');
    expect(calculatorService.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    calculatorService.constructNumber('1');
    expect(calculatorService.resultText()).toBe('1');

    calculatorService.constructNumber('2');
    expect(calculatorService.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    calculatorService.constructNumber('1');
    calculatorService.constructNumber('-');

    expect(calculatorService.lastOperator()).toBe('-');
    expect(calculatorService.subResultText()).toBe('1');
    expect(calculatorService.resultText()).toBe('0');
  });

  it('should handle decimal point correctly', () => {
    calculatorService.constructNumber('1');
    calculatorService.constructNumber('.');
    calculatorService.constructNumber('5');
    expect(calculatorService.resultText()).toBe('1.5');

    calculatorService.constructNumber('.');
    expect(calculatorService.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly starting with zero', () => {
    calculatorService.constructNumber('0');
    calculatorService.constructNumber('.');
    calculatorService.constructNumber('.');
    calculatorService.constructNumber('.');
    calculatorService.constructNumber('0');
    expect(calculatorService.resultText()).toBe('0.0');
  });

  it('should handle sign change correctly', () => {
    calculatorService.constructNumber('1');
    calculatorService.constructNumber('+/-');
    expect(calculatorService.resultText()).toBe('-1');

    calculatorService.constructNumber('+/-');
    expect(calculatorService.resultText()).toBe('1');
  });

  it('should handle max length correctly', () => {
    for (let index = 1; index < 10; index++) {
      calculatorService.constructNumber(`${index}`);
    }

    expect(calculatorService.resultText()).toBe('12345678');
  });
});
