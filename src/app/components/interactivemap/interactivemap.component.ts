import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {Vector as VectorLayer} from 'ol/layer';
import Style from 'ol/style/Style';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { PlantstateService } from 'src/app/services/plantstate.service';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import {Fill, Stroke} from 'ol/style';
import {Circle} from 'ol/geom';
import Overlay from 'ol/Overlay';
import {Control, defaults as defaultControls} from 'ol/control';

//Component for the Interactive map feature of the page, filtered data are shown here for user accessibily of further data such as net generation absolute value and percentage charts and detailed table

@Component({
  selector: 'app-interactivemap',
  templateUrl: './interactivemap.component.html',
  styleUrls: ['./interactivemap.component.css']
})


export class InteractivemapComponent implements OnInit {
  @Input() plants : any[];
  @Input() isFiltered:boolean;
  @Input() hasState:boolean;
  @Input() hasCategory:boolean;
  @Input() topN:any;
  @Input() selectedState:any = [];
  @Output() onPlantMarkerClick = new EventEmitter();
  isFetchDone : boolean = false;
  map : Map;
  vectorSource : any;
  plantIconsFeatures : any[] = [];
  categoryColorMap : any = {
    "WIND":"rgba(245, 39, 145, 0.75)",
    "GAS": "rgba(255, 0, 0, 0.75)",
    "OIL": "rgba(220, 0, 255, 0.75)",
    "HYDRO": "rgba(29, 0, 255, 0.75)",
    "COAL": "rgba(0, 0, 0, 0.75)",
    "OTHF": "rgba(0, 205, 255, 0.75)",
    "BIOMASS": "rgba(127, 0, 255, 0.75)",
    "OFSL": "rgba(0, 255, 8, 0.75)",
    "SOLAR": "rgba(231, 255, 0, 0.75)",
    "NUCLEAR": "rgba(255, 109, 0, 0.75)",
    "GEOTHERMAL": "rgba(149, 85, 38, 0.75)",
  }
  currStateCoords : any;

  constructor(private plantstateService: PlantstateService) { }

  //function to handle map reloading when filter is used
  ngOnChanges(): void{
    if(this.isFiltered){
      if(this.selectedState!=='' && this.selectedState!==undefined) this.getStateLatLon();
      if(this.topN && this.topN > 0){
        this.reInitMap();
      }
      else{
        this.reInitMap();
      }
    }else{
      this.generateMap();
    }
  }

  ngOnInit(): void {
  }

  getStateLatLon(){
    this.plantstateService.getStateDetails(this.selectedState).subscribe((state)=>{
      this.currStateCoords = [parseFloat(state[0].lon),parseFloat(state[0].lat)]
    })
  }

  //reinit map for when category and state is selected
  reInitMap(){
      this.vectorSource.refresh();
      this.plantIconsFeatures = [];

      this.plants.forEach((plant) => {
        const plantIcon = new Feature({
          geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
          name:plant.PNAME,
          state: plant.PSTATABB,
          category:plant.PLFUELCT,
          id:plant.SEQPLT20
        });
      
  
        let setColor = plant['PLFUELCT'] !== "" ? this.categoryColorMap[plant['PLFUELCT']] : "rgba(194, 68, 68, 0.75)";
        
        plantIcon.setStyle(
          new Style({
          fill: new Fill({
            color: setColor,
          }),
          stroke: new Stroke({
            color: '#DAA520',
            width: 0.5
          }),
          })
        );

        this.plantIconsFeatures.push(plantIcon);
      })
      
      this.vectorSource.addFeatures(this.plantIconsFeatures)

      setTimeout(()=>{
        if(this.selectedState) {
          this.map.getView().setCenter(olProj.fromLonLat(this.currStateCoords));
          this.map.getView().setZoom(6);
        }else{
          this.map.getView().setCenter(olProj.fromLonLat([-95,35]));
          this.map.getView().setZoom(4.5);
        }
      },200)

  }

  //redraw map whenever user uses the filters with category selected
  redrawMap(){
    if(this.isFiltered){
      this.vectorSource.refresh();
      this.plantIconsFeatures = [];
      
      Object.keys(this.plants).forEach((category:any)=>{
        this.plants[category].forEach((plant:any)=>{
          const plantIcon2 = new Feature({
            geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
            name:plant.PNAME,
            state: plant.PSTATABB,
            category:plant.PLFUELCT,
            id:plant.SEQPLT20
          });
    
          let setColor = (category !== "" && this.categoryColorMap[category.toUpperCase()]) ? this.categoryColorMap[category.toUpperCase()] : "#DAA52080";
          plantIcon2.setStyle(
            new Style({
            fill: new Fill({
              color: setColor,
            }),
            stroke: new Stroke({
              color: '#DAA520',
              width: 0.5
            }),
            })
          );
          this.plantIconsFeatures.push(plantIcon2);
        })

      })
      this.vectorSource.addFeatures(this.plantIconsFeatures)
    }
  }

  //if filter is not used/ initial map generation 
  generateMap(){
    const container = (<HTMLInputElement>document.getElementById("popup"));
    const content = (<HTMLInputElement>document.getElementById('popup-content'));
    const closer = (<HTMLInputElement>document.getElementById('popup-closer'));

    // popup overlay 
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 50
      }
    });


      this.plants.forEach((plant) => {
        const plantIcon = new Feature({
          //  geometry: new Point(olProj.fromLonLat([plant['LON'],plant['LAT']]))
          geometry: new Circle(olProj.fromLonLat([plant['LON'],plant['LAT']]), 15000),
          name:plant.PNAME,
          state: plant.PSTATABB,
          category:plant.PLFUELCT,
          id:plant.SEQPLT20
        });
    
        let setColor = plant['PLFUELCT'] !== "" ? this.categoryColorMap[plant['PLFUELCT']] : "rgba(255,0,0,0.5)";
        
        plantIcon.setStyle(
          new Style({
          fill: new Fill({
            color: setColor,
          }),
          stroke: new Stroke({
            color: '#DAA520',
            width: 0.5
          }),
          })
        );

        this.plantIconsFeatures.push(plantIcon);
      })

    

    this.vectorSource = new VectorSource({
      features: this.plantIconsFeatures
    })

    let vectorLayer = new VectorLayer({
      source: this.vectorSource
    })

    
    this.map = new Map({
      target: 'us-map',
      controls: defaultControls({ attribution: false }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      overlays: [overlay],
      view: new View({
        center: olProj.fromLonLat([-95,35]),
        zoom: 4.5
      })
    });

    this.map.addLayer(vectorLayer);
      




    // pointermove
    this.map.on('singleclick', (evt) => {
      const coordinate = evt.coordinate;

    
      const pixel = this.map.getEventPixel(evt.originalEvent);
      const hit = this.map.hasFeatureAtPixel(pixel);
      
      if(hit){
        this.map.forEachFeatureAtPixel(pixel, (feature, layer) => {
          content.innerHTML = '<div class="popup-wrapper">'+
          'Plant ID: <span style="margin-left:1em;">'+feature.get('id')+'</span><br/>'+
          'Plant Name: <span style="margin-left:1em;">'+feature.get('name')+'</span><br/>'+
          'Location: <span style="margin-left:1em;">'+feature.get('state')+'</span><br/>'+
          'Category: <span style="margin-left:1em;">'+feature.get('category')+'</span>'+
          '</div>';
          this.mapMarkerClick(feature.get('id'))
          this.map.getView().setCenter(coordinate);
        });
        
        overlay.setPosition(coordinate);
      }else{
        overlay.setPosition(undefined);
        closer.blur();
      }
     
    });


    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

  }

  //when user clicks map Marker, related to showing graphs
  mapMarkerClick(plantId:any){
    this.onPlantMarkerClick.emit(plantId)
  }

}

