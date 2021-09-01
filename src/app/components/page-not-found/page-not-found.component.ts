import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/shared/services/food.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit{
  public imgPath = "../../../assets/images/plate-304113_1280.png";

  constructor(private service: FoodService) {} 

  ngOnInit() {
    this.service._isFilterActive$.next(false);
  }
}
