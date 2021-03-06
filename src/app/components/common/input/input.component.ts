import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputType: string = '';
  public isFilterActive: boolean = false;
  public inputValue: string = '';
  public isUserFilterActive: boolean = false;

  constructor(private service: FoodService) {}

  ngOnInit() {
    this.service.isFilterActive.subscribe((res) => (this.isFilterActive = res));
    this.inputValue = '';
    if(this.inputType === "users"){
      this.isUserFilterActive = true;
    }
  }

  public onInput(event:any): void {
    let inputValue = event.target.value;
    if (this.inputType === 'header') {
      this.service._input$.next(inputValue);
    } else if (this.inputType === 'sideNav') {
      this.service._inputRes$.next(inputValue);
    } else if (this.inputType === 'users') {
      this.service._inputUsers$.next(inputValue);
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
    else if (this.inputType === 'users') {
      form.controls['first'].setValue('');
      this.inputValue = '';
      this.service._inputUsers$.next(this.inputValue);
    }
  }
}
