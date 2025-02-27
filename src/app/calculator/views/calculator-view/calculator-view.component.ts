// Angular.
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Componentes.
import { CalculatorComponent } from "../../components/calculator/calculator.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalculatorComponent],
  selector: 'calculator-view',
  standalone: true,
  templateUrl: './calculator-view.component.html',
})
export default class CalculatorViewComponent { }
