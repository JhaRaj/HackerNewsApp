import {ComponentFixture,TestBed,fakeAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideHttpClient} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {HNewsService} from './hnews.service';
import {MatTableDataSource} from '@angular/material/table';

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

  it('should create the component', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should populate the dataSource', fakeAsync(() => {
    component.dataSource=new MatTableDataSource([{title:'google',url:'https://www.google.com'}]);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.dataSource.data).toEqual([{title:'google',url:'https://www.google.com'}]);
  }));

  it('should filter the dataSource', fakeAsync(() => {
    component.dataSource.filter = 'title';
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.dataSource.filter).toBe('title');
  }));
});
