import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  chatWith: string;
  index: number;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  onClick() {
    this.router.navigate([
      {
        outlets: { primary: 'users', sidebar: `chat` },
      },
    ]);
  }
}
