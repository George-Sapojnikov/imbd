import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailsCardComponent } from './film-details-card.component';

describe('FilmDetailsCardComponent', () => {
  let component: FilmDetailsCardComponent;
  let fixture: ComponentFixture<FilmDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
