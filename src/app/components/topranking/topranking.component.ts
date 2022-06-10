import { Component, OnInit, Input,Output } from '@angular/core';

@Component({
  selector: 'app-topranking',
  templateUrl: './topranking.component.html',
  styleUrls: ['./topranking.component.css']
})
export class ToprankingComponent implements OnInit {
  @Input() plants : any;
  plantsData : any;
  title : string = 'Top N Plants Net Generation Details';

  constructor() { }

  ngOnChanges(): void {
    this.plantsData = this.plants;
  }

  ngOnInit(): void {

  }

}
