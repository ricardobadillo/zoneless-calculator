// Angular.
import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    // attribute: 'hola',
    // 'data-size': 'S',
  },
  imports: [],
  selector: 'app-calculator-button',
  standalone: true,
  styleUrl: './calculator-button.component.css',
  templateUrl: './calculator-button.component.html',
})
export class CalculatorButtonComponent {
  public isPressed = signal<boolean>(false);

  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  });

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  // @HostBinding('class.w-2/4') public get commandStyle() {
  //   return this.isDoubleSize();
  // }

  public handleClick(): void {
    const buttonReference = this.contentValue();

    if (!buttonReference) return;

    const value = buttonReference.nativeElement.innerText;
    this.onClick.emit(value);
  }

  public keyboardPressedStyle(key: string): void {
    const buttonReference = this.contentValue();

    if (!buttonReference) return;

    const value = buttonReference.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 500);
  }
}
