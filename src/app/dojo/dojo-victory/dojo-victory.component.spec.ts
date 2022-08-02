import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DojoVictoryComponent } from './dojo-victory.component';

describe('DojoVictoryComponent', () => {
  let component: DojoVictoryComponent;
  let fixture: ComponentFixture<DojoVictoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DojoVictoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DojoVictoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
