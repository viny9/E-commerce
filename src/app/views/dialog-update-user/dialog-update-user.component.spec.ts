import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateUserComponent } from './dialog-update-user.component';

describe('DialogUpdateUserComponent', () => {
  let component: DialogUpdateUserComponent;
  let fixture: ComponentFixture<DialogUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUpdateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
