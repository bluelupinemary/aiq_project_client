import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { AppComponent } from './app.component';
import { InteractivemapComponent } from './components/interactivemap/interactivemap.component';
import { MapdetailsComponent } from './components/mapdetails/mapdetails.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToprankingComponent } from './components/topranking/topranking.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NetGenerationDetailsComponent } from './components/net-generation-details/net-generation-details.component';
import { PercentageDetailsComponent } from './components/percentage-details/percentage-details.component';
import { FeaturedPlantsComponent } from './components/featured-plants/featured-plants.component';

@NgModule({
  declarations: [
    AppComponent,
    InteractivemapComponent,
    MapdetailsComponent,
    HeaderComponent,
    SearchbarComponent,
    ToprankingComponent,
    DashboardComponent,
    NetGenerationDetailsComponent,
    PercentageDetailsComponent,
    FeaturedPlantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
