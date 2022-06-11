import { Component, OnInit, Input,Output } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { PlantstateService } from 'src/app/services/plantstate.service';


//Component for the net generation detail for any marker/ plant selected in the maps, creates data in bar chart

@Component({
  selector: 'app-net-generation-details',
  templateUrl: './net-generation-details.component.html',
  styleUrls: ['./net-generation-details.component.css']
})
export class NetGenerationDetailsComponent implements OnInit {
  @Input() plantId:any;
  barChart: any = [];
  plantDetails:any;
  allCategoriesData:any=[];
  nonRenewablesData:any=[];
  nonHydroRenewablesData:any=[];
  nonCombustionData:any=[];
  barChartLabels:any=[];
  nonCategory:any = ['PLGENATN','PLGENATR','PLGENATH','PLGENACY','PLGENACN'];
  nonRenewables:any =['PLGENATN','PLGENATR'];
  nonHydroRenewables:any =['PLGENATH'];
  nonCombustion:any=['PLGENACY','PLGENACN'];
  netGenerationMap:any = {
    "PLGENACL": "Coal",
    "PLGENAOL": "Oil",
    "PLGENAGS": "Gas",
    "PLGENANC": "Nuclear",
    "PLGENAHY": "Hydro",
    "PLGENABM": "Biomass",
    "PLGENAWI": "Wind",
    "PLGENASO": "Solar",
    "PLGENAGT": "Geothermal",
    "PLGENAOF": "Fossil",
    "PLGENAOP": "Unknown/Purchased Fuel",
    "PLGENATN": "Non-Renewables",
    "PLGENATR": "Renewables",
    "PLGENATH": "NonHydro Renewables",
    "PLGENACY": "Combustion",
    "PLGENACN": "Non-Combustion"

  }

  constructor(private plantstateService:PlantstateService) { 
    Chart.register(...registerables);
  }

  ngOnChanges():void {
    if(this.plantId && this.plantId!==null && this.plantId !=''){
      this.allCategoriesData=[];
      this.barChartLabels=[];
      
      this.plantstateService.getPlantDetailsByType(this.plantId,"net").subscribe((plantDetails)=>{
          Object.entries(plantDetails[0]).map(([key,val])=>{
              this.allCategoriesData.push(val);
              this.barChartLabels.push(this.netGenerationMap[key]);
          });

          var chartExist = Chart.getChart("canvasBar"); // <canvas> id
          if (chartExist != undefined) {
              chartExist.destroy(); 
          }
          setTimeout(()=>{
            this.generateBarChart(this.allCategoriesData);
          },200)
          
        });
        
    }
  }

  generateBarChart(theData:[]){
    const data = {
      labels: this.barChartLabels,
      datasets: [
        {
          label: 'Annual net generation',
          data: theData,
          backgroundColor: ["rgba(0, 0, 0, 0.75)",
           "rgba(220, 0, 255, 0.75)",
            "rgba(255, 0, 0, 0.75)",
            "rgba(255, 109, 0, 0.75)",
            "rgba(29, 0, 255, 0.75)",
            "rgba(0, 255, 8, 0.75)",
            "rgba(245, 39, 145, 0.75)",
            "rgba(231, 255, 0, 0.75)",
            "rgba(149, 85, 38, 0.75)", 
            "rgba(0, 255, 8, 0.75)",
            "rgba(0, 205, 255, 0.75)", 
            "#7eb0d5",
            "#b2e061", 
            "#bd7ebe",
            "#0d88e6", 
            "#00b7c7",
          ],
        }
      ]
    };

    this.barChart = new Chart('canvasBar', {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales:{
          y:{
            beginAtZero:true
          },
          x:{
          }
        }
      },
    });
  }

  ngOnInit(): void {
   
  }



}
