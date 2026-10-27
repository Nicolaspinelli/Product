import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponen } from './home-component';

describe('HomeComponen', () => {
  let component: HomeComponen;
  let fixture: ComponentFixture<HomeComponen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponen],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
