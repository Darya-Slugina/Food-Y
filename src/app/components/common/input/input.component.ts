import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dish } from 'src/app/shared/interfaces/food.interface';
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
  public isFilterActive: boolean;
  public inputValue: string;

  constructor(private service: FoodService) {}

  ngOnInit() {
    this.service.isFilterActive.subscribe((res) => (this.isFilterActive = res));
    this.inputValue = '';
  }

  public onInput(event): void {
    let inputValue = event.target.value;
    if (this.inputType === 'header') {
      this.service._input$.next(inputValue);
    } else if (this.inputType === 'sideNav') {
      this.service._inputRes$.next(inputValue);
    }
  }

  public clearInput(form: NgForm): void {
    if (this.inputType === 'header') {
      form.controls['first'].setValue('');
      this.inputValue = '';
      this.service._input$.next(this.inputValue);
    }else if (this.inputType === 'sideNav') {
      form.controls['first'].setValue('');
      this.inputValue = '';
      this.service._inputRes$.next(this.inputValue);
    }
  }
}
