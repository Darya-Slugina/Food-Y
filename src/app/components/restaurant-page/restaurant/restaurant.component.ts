import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RestaurantComponent implements OnInit {
  public title: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('restaurant');
  }

  public changeRoute(): void {
    this.router.navigate([`/restaurant/${this.title}/info`]);
  }
}
