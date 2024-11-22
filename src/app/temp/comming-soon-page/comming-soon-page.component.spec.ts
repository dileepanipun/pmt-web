import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingSoonPageComponent } from './comming-soon-page.component';

describe('CommingSoonPageComponent', () => {
  let component: CommingSoonPageComponent;
  let fixture: ComponentFixture<CommingSoonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommingSoonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommingSoonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
