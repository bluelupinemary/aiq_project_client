import { Component, OnInit, Output } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

@Component({
  selector: 'app-featured-plants',
  templateUrl: './featured-plants.component.html',
  styleUrls: ['./featured-plants.component.css']
})
export class FeaturedPlantsComponent implements OnInit {
  @Output() featuredPlants : any[] = [];
  cardTitles:any = [
    "Top 1 Nuclear Plant",
    "Top 1 Renewable Plant",
    "Top 1 Non-Renewable Plant",
    "Top 1 Non-Hydro Plant",
  ]

  constructor(private plantstateService : PlantstateService) { }

  ngOnChanges(): void{
  }

  ngOnInit(): void {
    const categories = ['NUCLEAR','RENEWABLE','NONRENEWABLE','NONHYDRO'];
    categories.map((category)=>{
      this.plantstateService.getTopPlantsByNetGenerationByCategory(category,1).subscribe((details)=>{
        this.featuredPlants.push(details[category][0]);    
      })
    })
    
  }

}
