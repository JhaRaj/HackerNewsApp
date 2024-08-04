import {TestBed,inject} from '@angular/core/testing';
import {provideHttpClientTesting,HttpTestingController} from "@angular/common/http/testing";
import {HNewsService} from './hnews.service';
import {provideHttpClient} from '@angular/common/http';

describe("HNewsService", () => {
    let httpTestingController: HttpTestingController;
    let httpservice: HNewsService;
    let baseUrl = "https://localhost:7214/api/HackerNews/GetStories";
    let data: {title: string; url: string;};
   
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          HNewsService,
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      });
  
      httpTestingController = TestBed.inject(HttpTestingController);
      data = {title: 'google', url:'https://google.com'};
    });
  
    beforeEach(inject([HNewsService],(service: HNewsService) => {
        httpservice = service;
      }
    ));

    it('create httpservice', () => {
      expect(httpservice).toBeTruthy();
    });
    
    it('mock api stories data', () => {
      httpservice.getData().subscribe((res:any) => {
        expect(res).toEqual(data);
      });
	    const req = httpTestingController.expectOne({
	      method: 'GET',
	      url: baseUrl,
	    });
	    req.flush(data);
	  });

  });