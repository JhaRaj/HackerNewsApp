import {Component, ViewChild , OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HNewsService} from './hnews.service';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

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

export class AppComponent implements OnInit {
  isLoading:boolean=false;
  displayedColumns: string[] = ['title'];
  dataSource = new MatTableDataSource<Story>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hnewSrvc: HNewsService) {
   };

  ngOnInit(): void {
    this.getStoryData();
  }

  getStoryData():void
  {
    this.isLoading=true;
    this.hnewSrvc.getData().subscribe((data:any) => {
      this.dataSource = new MatTableDataSource(data as Story[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  applyFilter(searchText:string) {
    this.dataSource.filter = searchText.trim().toLowerCase();
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter);
    };
  }
  
}
