// Angular.
import { Component, computed, inject, viewChildren } from '@angular/core';

// Componentes.
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

// Servicios.
import { CalculatorService } from '../../services/calculator.service';

@Component({
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
  imports: [CalculatorButtonComponent],
  selector: 'app-calculator',
  styleUrl: './calculator.component.css',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  public keyEquivalents: Record<string, string> = {
    Backspace: 'C',
    Escape: 'AC',
    '%': '%',
    '/': '÷',
    '7': '7',
    '8': '8',
    '9': '9',
    x: 'x',
    '4': '4',
    '5': '5',
    '6': '6',
    '-': '-',
    '1': '1',
    '2': '2',
    '3': '3',
    '+': '+',
    '0': '0',
    '.': '.',
    Enter: '=',
  };

  public handleClick(value: string | Event): void {
    if (value instanceof Event) return;

    const keyValue: string | undefined = this.keyEquivalents[value] ?? value;

    if (!keyValue) return;

    this.resolveButtonPress(keyValue);
  }

  // @HostListener('document:keyup', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    const keyValue: string | undefined =
      this.keyEquivalents[event.key] ?? event.key;

    if (!keyValue) return;

    this.resolveButtonPress(keyValue);
  }

  public resolveButtonPress(value: string): void {
    const pressedButton = this.calculatorButtons().find(
      (button: CalculatorButtonComponent) =>
        button.contentValue()?.nativeElement.innerText === value
    );

    if (!pressedButton) return;

    pressedButton.keyboardPressedStyle(value);
    this.calculatorService.constructNumber(value);
  }
}
