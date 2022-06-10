import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mapdetails',
  templateUrl: './mapdetails.component.html',
  styleUrls: ['./mapdetails.component.css']
})
export class MapdetailsComponent implements OnInit {
  categoryMap : any = [
    {"key":"WIND","color":"rgba(245, 39, 145, 0.75)"},
    {"key":"GAS","color":"rgba(255, 0, 0, 0.75)"},
    {"key":"OIL","color":"rgba(220, 0, 255, 0.75)"},
    {"key":"HYDRO","color":"rgba(29, 0, 255, 0.75)"},
    {"key":"COAL","color":"rgba(0, 0, 0, 0.75)"},
    {"key":"OTHF","color":"rgba(0, 205, 255, 0.75)"},
    {"key":"BIOMASS","color":"rgba(0, 255, 8, 0.75)"},
    {"key":"FOSSIL","color":"rgba(0, 255, 8, 0.75)"},
    {"key":"SOLAR","color":"rgba(231, 255, 0, 0.75)"},
    {"key":"NUCLEAR","color":"rgba(255, 109, 0, 0.75)"},
    {"key":"GEOTHERMAL","color":"rgba(149, 85, 38, 0.75)"}
  ];

  constructor() { }

  ngOnInit(): void {
    }

}
