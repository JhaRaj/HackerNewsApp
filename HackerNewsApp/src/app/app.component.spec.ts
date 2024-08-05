import {ComponentFixture,TestBed,waitForAsync} from '@angular/core/testing';
import {AppComponent,Story} from './app.component';
import {provideHttpClient} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {HNewsService} from './hnews.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const result:Story[]= [{ title: 'story', url: 'https://api/story' }];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule,MatPaginatorModule],
      providers: [HNewsService,provideHttpClient(),provideHttpClientTesting(),AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create app component', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories to table dataSource on method call getStoryData',()=>{
    let service=fixture.debugElement.injector.get(HNewsService);
    spyOn(service,'getData').and.callFake(()=>{
      return of(result);
    })
    component.getStoryData();
    expect(component.dataSource.data).toEqual(result);
  });

  it('should filter data from table dataSource',()=>{
    let service=fixture.debugElement.injector.get(HNewsService);
    spyOn(service,'getData').and.callFake(()=>{
      return of(result);
    });
    component.getStoryData();
    component.applyFilter('story')
    expect(component.dataSource.filteredData[0].title).toContain('story');
  });

  it('should handle pagination', () => {
    let service=fixture.debugElement.injector.get(HNewsService);
    spyOn(service,'getData').and.callFake(()=>{
      return of(result);
    });

    component.getStoryData();
    fixture.detectChanges();

    const mockPaginator: MatPaginator = {
      length: 200,
      pageSize: 5,
      pageIndex: 0,
      pageSizeOptions: [5, 10, 25, 100],
      hasPreviousPage: () => component.paginator.pageIndex > 0,
      hasNextPage: () =>component.paginator.pageIndex < 40,
    } as MatPaginator;
    component.paginator = mockPaginator;
    component.paginator.pageIndex = 1;
    while (component.paginator.hasNextPage()) 
    {
      component.paginator.pageIndex++;  
    };
    expect(component.paginator.pageIndex).toEqual(40);
  }); 

});



