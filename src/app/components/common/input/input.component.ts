import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Dish } from 'src/app/shared/models/food.model';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() label: string;
  @Input() inputType: string;
  isFilterActive: boolean;

  constructor(private service: FoodService) {
  }

  ngOnInit() {
    this.service.isFilterActive.subscribe((res) => this.isFilterActive = res);
  }

  onInput(event): void {
    let inputValue = event.target.value;
    if (this.inputType === 'header') {
      this.service._input$.next(inputValue);
    } else if (this.inputType === 'sideNav') {
      this.service._inputRes$.next(inputValue);
    }
  }
}
