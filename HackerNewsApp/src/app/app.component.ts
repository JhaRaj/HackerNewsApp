import {Component, ViewChild , OnInit,OnDestroy } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HNewsService} from './hnews.service';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs'

export interface Story {
  title: string;
  url: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,CommonModule,MatProgressSpinner],
  providers:[HNewsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit,OnDestroy {

  private subscription: Subscription | undefined

  displayedColumns: string[] = ['title'];
  dataSource: MatTableDataSource<Story>=new MatTableDataSource([{title:'',url:''}]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading=false;

  constructor(private hnewSrvc: HNewsService) {
    this.dataSource=new MatTableDataSource([{title:'',url:''}]);
    this.dataSource.sort = null;
    this.isLoading=true;
   };

  ngOnInit(): void {
      this.subscription = this.hnewSrvc.getData().subscribe((data:[{title:string,url:string}]) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter);
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}