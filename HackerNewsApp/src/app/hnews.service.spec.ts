import {TestBed,inject} from '@angular/core/testing';
import {provideHttpClientTesting,HttpTestingController} from "@angular/common/http/testing";
import {HNewsService} from './hnews.service';
import {provideHttpClient} from '@angular/common/http';

describe("HNewsService", () => {
    let httpTestingController: HttpTestingController;
    let httpservice: HNewsService;
    let baseUrl = "https://localhost:7214/api/HackerNews/GetStories";
    let data: {title: string; url: string;} | null;
   
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

    it('should create http service', () => {
      expect(httpservice).toBeTruthy();
    });
    
    it('should mock api data', () => {
      httpservice.getData().subscribe((res:any) => {
        expect(res).toEqual(data);
      });
	    const req = httpTestingController.expectOne({
	      method: 'GET',
	      url: baseUrl,
	    });
	    req.flush(data);
	  });

    it('should handle http error', () => {
      httpservice.getData().subscribe({
        error: (error) => {
          expect(error.status).toBe(403);
        },
      });
      
      const req = httpTestingController.expectOne({
	      method: 'GET',
	      url: baseUrl,
	    });
  
      req.flush('error occured', {
        status: 403,
        statusText: 'Forbidden',
      });

    });

  });
