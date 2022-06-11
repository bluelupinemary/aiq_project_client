import { Component, OnInit, Output } from '@angular/core';
import { PlantstateService } from 'src/app/services/plantstate.service';

//component for the main dashboard feature of the page, main arrays, objects and functionalities are available here for other sub components

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() plants : any[];
  @Output() isFiltered : boolean = false;
  @Output() hasState: boolean = false;
  @Output() hasCategory: boolean = false;
  @Output() topN : any;
  @Output() plantId : any;
  @Output() selectedState: any;
  @Output() isShowTopRanking: boolean = false;
  topPlantsSorted : any[];

  constructor(private plantstateService : PlantstateService) { }

  ngOnInit(): void {
    this.plantstateService.getAllPlants().subscribe((plants)=>{
      this.plants = plants;
    });

    this.plantstateService.getTopPlantsByNetGeneration().subscribe((topPlantsSorted)=>{
      this.topPlantsSorted = topPlantsSorted;
    });

    
  }

  ngOnChange(): void {
    
  }

  getAllPlants(){
    this.plantstateService.getAllPlants().subscribe((plants)=>{
      this.plants = plants;
      this.topN = null;
      this.hasState = false;
      this.hasCategory = false;
    }) 
  }

  getAllPlantsByState(state:string){
    this.plantstateService.getAllPlantsByState(state).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
    })  
  }

  getAllPlantsByCategory(category:string){
    this.plantstateService.getAllPlantsByCategory(category).subscribe((plants)=>{
      this.plants = plants;
      this.hasCategory = true;
    })  
  }

  getAllPlantsByStateByCategory(category:string, state:string){
    this.plantstateService.getAllPlantsByStateByCategory(category, state).subscribe((plants)=>{
      this.plants = plants;
      this.hasState = true;
      this.isFiltered = true;
    })  
  }


  //functions related to getting top N plants
  getTopNPlants(n:any,state:any,category:any){
    n = parseInt(n);
    if(n < this.topPlantsSorted.length){
      this.plants = this.topPlantsSorted.slice(0,n);
      this.isFiltered = true;
      this.topN = n;
      this.isShowTopRanking = true;
    }
  }

  getTopNPlantsByState(state:string, n:any){
    const topNPlantsByState = this.topPlantsSorted.filter((item)=>{ return item['PSTATABB'] === state})
    n = parseInt(n);
    if(n < this.topPlantsSorted.length){
      this.plants = topNPlantsByState.slice(0,n);
      this.isFiltered = true;
      this.hasState = true;
      this.topN = n;
      this.isShowTopRanking = true;
    }
  }

  getTopNPlantsByCategory(category:string, n:any){
    const topNPlantsByCategory = this.topPlantsSorted.filter((item)=>{ return item['PLFUELCT'] === category})
    n = parseInt(n);
    if(n < this.topPlantsSorted.length){
      this.plants = topNPlantsByCategory.slice(0,n);
      this.isFiltered = true;
      this.hasState = false;
      this.hasCategory = true;
      this.topN = n;
      this.isShowTopRanking = true;
    }
  }

  getTopNPlantsByStateByCategory(state:string, category:string, n:any){
    const topNPlantsByStateByCategory = this.topPlantsSorted.filter((item)=>{ return (item['PLFUELCT'] === category && item['PSTATABB'] === state)})
    n = parseInt(n);
    if(n < this.topPlantsSorted.length){
      this.plants = topNPlantsByStateByCategory.slice(0,n);
      this.isFiltered = true;
      this.hasState = true;
      this.hasCategory = true;
      this.topN = n;
      this.isShowTopRanking = true;
    }
  }


  //once header form is submitted, get data for showing to the map
  onHeaderSubmitValues(formValues:any){
    if(formValues.topNForm!=='' && formValues.topNForm!==null){
      if(formValues.stateForm!=='' && formValues.stateForm!==null && formValues.stateForm!=='null'){
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null && formValues.categoryForm!=='null'){
          this.getTopNPlantsByStateByCategory(formValues.stateForm, formValues.categoryForm, formValues.topNForm);
        }else{
          this.getTopNPlantsByState(formValues.stateForm, formValues.topNForm);
          // this.getTopNPlants(formValues);
        }
      }else{
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null  && formValues.categoryForm!=='null'){
          this.getTopNPlantsByCategory(formValues.categoryForm, formValues.topNForm);
        }else{
          this.getTopNPlants(formValues.topNForm,null,null);
        }
      }
    }else{
        this.isShowTopRanking = false;
      if(formValues.stateForm!=='' && formValues.stateForm!==null   && formValues.stateForm!=='null'){
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null   && formValues.categoryForm!=='null'){
          this.getAllPlantsByStateByCategory(formValues.categoryForm,formValues.stateForm)
        }else{
          this.getAllPlantsByState(formValues.stateForm)
        }
      }else{
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null  && formValues.categoryForm!=='null'){
          this.getAllPlantsByCategory(formValues.categoryForm);
        }else{
          this.getAllPlants();
        }
      }
    }
    this.isFiltered = true;

    if(formValues.stateForm!=='' && formValues.stateForm!==null && formValues.stateForm!=='null'){
      this.selectedState = formValues.stateForm;
    }else{
      this.selectedState = '';
    }

    this.plantId = null;
  }

  //for when a marker is clicked from the map
  showPlantDetails(plantId: any){
    if(plantId){
      this.plantId = plantId;
    }
    else{
      this.plantId = null;
    }
  }
}
