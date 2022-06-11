import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PlantstateService } from 'src/app/services/plantstate.service';

//Component for the header and form feature of the page; user can filter by state, by category and by top N power plants by filling the fields available here

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onSubmitValues = new EventEmitter();
  @Output() formSubmitValues : any;
  @Output() stateFormList : any[] = [];
  @Output() categoryFormList : any[] = [
    {
      "key":"BIOMASS","val": "Biomass"
    },
    {
      "key":"COAL","val": "Coal"
    },
    {
      "key":"OFSL","val": "Fossil"
    },
    {
      "key":"GAS","val": "Gas"
    },
    {
      "key":"GEOTHERMAL","val": "Geothermal"
    },
    {
      "key":"HYDRO","val": "Hydro"
    },
    {
      "key":"NONRENEWABLE","val": "Non-renewable"
    },
    {
      "key":"NUCLEAR","val": "Nuclear"
    },
    {
      "key":"OIL","val": "Oil"
    },
    {
      "key":"OTHF","val": "Other Purchased Fuel"
    },
    {
      "key":"RENEWABLE","val": "Renewable"
    },
    {
      "key":"SOLAR","val": "Solar"
    },
    {
      "key":"WIND","val": "Wind"
    },
    {
      "key":"NONHYDRO","val": "NonHydro Renewable"
    }
  ]

  constructor(private plantstateService : PlantstateService) { }

  ngOnInit(): void {
     this.plantstateService.getAllStates().subscribe((states)=>{
      states.forEach((state:any)=>{
        let code = state['PSTATABB'];
        let data = {
          "code": code,
          "name": state['name'],
        }
        this.stateFormList.push(data)
      })
    })
  }

  
  form = new FormGroup({
    stateForm: new FormControl(),
    categoryForm: new FormControl(),
    topNForm: new FormControl()
  });
  
  get f(){
    return this.form.controls;
  }

  submitForm(){
    this.onSubmitValues.emit(this.form.value)
  }

}
