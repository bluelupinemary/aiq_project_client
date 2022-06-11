import { Component, OnInit, Output } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

//component for the featured cards / top 5 power plants located at the bottom of the page

@Component({
  selector: 'app-featured-plants',
  templateUrl: './featured-plants.component.html',
  styleUrls: ['./featured-plants.component.css']
})
export class FeaturedPlantsComponent implements OnInit {
  @Output() featuredPlants : any[] = [];
  cardTitles:any = [
    "Top 5 Nuclear Plants",
    "Top 5 Renewable Plants",
    "Top 5 Non-Renewable Plants",
    "Top 5 Non-Hydro Plants",
  ]

  constructor(private plantstateService : PlantstateService) { }

  ngOnChanges(): void{
  }

  ngOnInit(): void {
    const categories = ['NUCLEAR','RENEWABLE','NONRENEWABLE','NONHYDRO'];
    categories.map((category)=>{
      this.plantstateService.getTopPlantsByNetGenerationByCategory(category,5).subscribe((details)=>{
        this.featuredPlants.push(details[category]);    
      })
    })
    
  }

}
