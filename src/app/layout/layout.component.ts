import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  data = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  getData() {
    this.apiService.getData().subscribe(res => {
      this.data = JSON.stringify(res);
    });
  }

}
