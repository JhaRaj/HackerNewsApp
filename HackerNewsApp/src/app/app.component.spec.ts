import {ComponentFixture,TestBed,fakeAsync} from '@angular/core/testing';
import {AppComponent,Story} from './app.component';
import {provideHttpClient} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {HNewsService} from './hnews.service';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: HNewsService;
 
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule,AppComponent],
      providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                HNewsService,
              ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HNewsService);
    fixture.detectChanges();
  });

  it('component should be created', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

});


