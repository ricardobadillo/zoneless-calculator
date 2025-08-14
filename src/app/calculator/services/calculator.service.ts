// Angular.
import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '÷'];

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  public resultText = signal<string>('0');
  public subResultText = signal<string>('0');
  public lastOperator = signal<string>('+');

  public constructNumber(value: string): void {
    // Calcular el resultado.
    if (value === '=') {
      this.calculateResult();
      return;
    }

    // Borrar todo.
    if (value === 'AC') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // Borrar el último número.
    if (value === 'C') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((prevResult: string) => prevResult.slice(0, -1));
      return;
    }

    // Aplicar operador matemático.
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limitar la cantidad de caracteres.
    if (this.resultText().length >= 8) return;

    // Colocar el punto.
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }

      this.resultText.update((prevResult: string) => prevResult + '.');
      return;
    }

    // Manejo de el cero inicial.
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    )
      return;

    // Cambiar signo.
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((prevResult: string) => prevResult.slice(1));
        return;
      }

      this.resultText.update((prevResult: string) => '-' + prevResult);
      return;
    }

    // Colocar números.
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((prevResult: string) => prevResult + value);
      return;
    }
  }

  public calculateResult(): void {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
