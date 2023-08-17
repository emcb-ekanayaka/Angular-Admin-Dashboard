import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor( 
  ){
  }

ngOnInit(){
this.chartView();
}

  chartView(){
    (async function() {
      const data = [
        { 
          year: 2010,
          count: 65 
        },
        { 
          year: 2011,
          count: 70 
        },
        { 
          year: 2012,
          count: 50
        },{ 
          year: 2014,
          count: 40
        },{ 
          year: 2015,
          count: 69
        },{ 
          year: 2016,
          count: 45
        },{ 
          year: 2017,
          count: 35
        }
      ];
    
      new Chart(
         document.getElementById('myChart') as HTMLCanvasElement,
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'Orders by Year',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    })();
  }
}
