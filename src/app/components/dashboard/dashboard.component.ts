import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { PlantstateService } from 'src/app/services/plantstate.service';

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

  getTopNPlants(n:any){
    n = parseInt(n);
    if(n < this.topPlantsSorted.length){
      this.plants = this.topPlantsSorted.slice(0,n);
      this.isFiltered = true;
      this.topN = n;
      this.isShowTopRanking = true;
    }
  }

  getTopNPlantsByState(state:string, n:any){
    this.plantstateService.getTopPlantsByNetGenerationByState(state, n).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
      this.hasState = true;
      this.topN = n;
      this.isShowTopRanking = false;
    })  
  }

  getTopNPlantsByCategory(category:string, n:any){
    this.plantstateService.getTopPlantsByNetGenerationByCategory(category, n).subscribe((plants)=>{
      this.plants = plants;
      this.hasCategory = true;
      this.isFiltered = true;
      this.topN = n;
      this.isShowTopRanking = false;
    })  
  }

  getTopNPlantsByStateByCategory(state:string, category:string, n:any){
    n = parseInt(n);
    this.plantstateService.getTopPlantsByNetGenerationByStateByCategory(state,category,n).subscribe((plants)=>{
      this.plants = plants;
      this.isFiltered = true;
      this.hasState = true;
      this.topN = n;
      this.isShowTopRanking = false;
    })  
  }


  //once header form is submitted
  onHeaderSubmitValues(formValues:any){
    if(formValues.topNForm!=='' && formValues.topNForm!==null){
      if(formValues.stateForm!=='' && formValues.stateForm!==null && formValues.stateForm!=='null'){
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null && formValues.categoryForm!=='null'){
          this.getTopNPlantsByStateByCategory(formValues.stateForm, formValues.categoryForm, formValues.topNForm);
        }else{
          this.getTopNPlantsByState(formValues.stateForm, formValues.topNForm);
        }
      }else{
        if(formValues.categoryForm!=='' && formValues.categoryForm!==null  && formValues.categoryForm!=='null'){
          this.getTopNPlantsByCategory(formValues.categoryForm, formValues.topNForm);
        }else{
          this.getTopNPlants(formValues.topNForm);
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
  }


  showPlantDetails(plantId: any){
    if(plantId){
      this.plantId = plantId;
    }
    else{
      this.plantId = null;
    }
  }
}
