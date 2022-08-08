import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionImagesComponent } from './champion-images.component';

describe('ChampionImagesComponent', () => {
  let component: ChampionImagesComponent;
  let fixture: ComponentFixture<ChampionImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
