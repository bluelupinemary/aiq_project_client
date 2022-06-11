import { Component, OnInit, Input } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { PlantstateService } from 'src/app/services/plantstate.service';

//Component for the net generation detail for any marker/ plant selected in the map, creates the pie charts

@Component({
  selector: 'app-percentage-details',
  templateUrl: './percentage-details.component.html',
  styleUrls: ['./percentage-details.component.css']
})
export class PercentageDetailsComponent implements OnInit {
  @Input() plantId:any;
  chart: any;
  chart2:any;
  chart3:any;
  chart4:any;
  plantDetails:any;
  allCategoriesData:any=[];
  nonRenewablesData:any=[];
  nonHydroRenewablesData:any=[];
  nonCombustionData:any=[];
  chartLabels:any=[];
  chartLabels2:any=[];
  chartLabels3:any=[];
  chartLabels4:any=[];
  nonCategory:any = ['PLTNPR','PLTRPR','PLTHPR','PLCYPR','PLCNPR'];
  nonRenewables:any =['PLTNPR','PLTRPR'];
  nonHydroRenewables:any =['PLTHPR'];
  nonCombustion:any=['PLCYPR','PLCNPR'];
  percentageMap:any = {
    "PLCLPR": "Coal %",
    "PLOLPR": "Oil %",
    "PLGSPR": "Gas %",
    "PLNCPR": "Nuclear %",
    "PLHYPR": "Hydro %",
    "PLBMPR": "Biomass %",
    "PLWIPR": "Wind %",
    "PLSOPR": "Solar %",
    "PLGTPR": "Geothermal %",
    "PLOFPR": "Fossil %",
    "PLOPPR": "Ukwn/Purch. Fuel %",
    "PLTNPR": "Non-Renewables %",
    "PLTRPR": "Renewables %",
    "PLTHPR": "NonHydro Renwbls %",
    "PLCYPR": "Combustion %",
    "PLCNPR": "Non-Combustion %"
  }


  constructor(private plantstateService:PlantstateService) { 
    Chart.register(...registerables);
  }

  ngOnChanges():void {
    if(this.plantId && this.plantId!==null && this.plantId !=''){
      this.allCategoriesData=[];
      this.nonRenewablesData=[];
      this.nonHydroRenewablesData=[];
      this.nonCombustionData=[];
      this.chartLabels=[];
      this.chartLabels2=[];
      this.chartLabels3=[];
      this.chartLabels4=[];

        this.plantstateService.getPlantDetailsByType(this.plantId,"percent").subscribe((plantDetails)=>{
          Object.entries(plantDetails[0]).map(([key,val])=>{
            if(!this.nonCategory.includes(key)){
              this.allCategoriesData.push(val);
              this.chartLabels.push(this.percentageMap[key]);
            }else{
              if(this.nonRenewables.includes(key)){
                this.nonRenewablesData.push(val);
                this.chartLabels2.push(this.percentageMap[key]);
              }else if(this.nonHydroRenewables.includes(key)){
                this.nonHydroRenewablesData.push(val);
                this.chartLabels3.push(this.percentageMap[key]);
              }else{
                this.nonCombustionData.push(val);
                this.chartLabels4.push(this.percentageMap[key]);
              }

            }
            
            
          });

          var chartExist = Chart.getChart("canvasPie"); // <canvas> id
          if (chartExist != undefined) {
              chartExist.destroy(); 
              Chart.getChart("canvasPie2")?.destroy();
              Chart.getChart("canvasPie3")?.destroy();
              Chart.getChart("canvasPie4")?.destroy();
          }
          setTimeout(()=>{
            this.generatePieChart(this.allCategoriesData,'canvasPie',this.chartLabels);
            this.generatePieChart(this.nonRenewablesData,'canvasPie2',this.chartLabels2);
            this.generatePieChart(this.nonHydroRenewablesData,'canvasPie3',this.chartLabels3);
            this.generatePieChart(this.nonCombustionData,'canvasPie4',this.chartLabels4);
          },200)
          
        });
        
    }
  }

  destroyPieChart(){
    
  }

  generatePieChart(theData:any,theCanvas:any,theLabels:any){

    const data = {
      labels: theLabels,
      datasets: [
        {
          label: 'Dataset 1',
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

    let newChart = new Chart(theCanvas, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display:true,
            position: 'right',
          },

          title: {
            display: false
          }
        }
      },
    });

    
  if(theCanvas==='canvasPie') this.chart = newChart;
  if(theCanvas==='canvasPie2') this.chart2 = newChart;
  if(theCanvas==='canvasPie3') this.chart3 = newChart;
  if(theCanvas==='canvasPie4') this.chart4 = newChart;
  }

  ngOnInit(): void {
  //  this.generatePieChart()
  }

}
