import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToprankingComponent } from './topranking.component';

describe('ToprankingComponent', () => {
  let component: ToprankingComponent;
  let fixture: ComponentFixture<ToprankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToprankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToprankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
