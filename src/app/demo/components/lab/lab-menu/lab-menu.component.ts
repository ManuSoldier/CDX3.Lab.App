import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabService } from '../../../service/LabService';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-lab-menu',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './lab-menu.component.html',
  styleUrls: ['./lab-menu.component.scss']
})
export class LabMenuComponent implements OnInit{

  labData: any[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  len: number = 0;

  constructor(
    private router: Router, 
    private labService: LabService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Method to fetch data when the button is clicked
  fetchData(): void {
    this.isLoading = true;
    this.isError = false; // Reset error flag
    this.labService.getMenu()
      .subscribe({
        next: (response: any) => {
          this.labData = response;
          this.len = this.labData?.length;
          console.log('Fetched data:', this.labData);
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error fetching data:', error);
          this.isError = true;
          this.isLoading = false;
        }
      });
  }
}
