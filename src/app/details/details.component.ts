import { Component } from '@angular/core';
import { StockService } from '../stock.service';
import { StockApi } from '../models/stockApi.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss','.././home/home.component.scss']
})
export class DetailsComponent {
  dataPoints:any = [];
  chart:any;
  pagination: number=0;
  siNo: number=0;
  change :number=10;

  constructor(private _serv:StockService){}
  
  stockApi:StockApi[]=[]
  stockApiDay:StockApi[]=[]
  symbol:string | undefined |null
  name:string=''
  chartType:string='splineArea'
  date=new Date()
  ngOnInit(){
    this.symbol=sessionStorage.getItem('sym')
    let n=sessionStorage.getItem('name')
    if(n!=null){
      this.name=n
      console.log(this.name)
    }
    if(this.symbol!=null){
    this._serv.getApi(this.symbol).subscribe(data=>{
      this.stockApi=JSON.parse(JSON.stringify( data.values))
      console.log(this.stockApi)
      this.view()
    })
  } 
  }
  getDet(){
    // console.log(this.endDate)
    if(this.symbol!=null){
      console.log(this.date)
      
      this._serv.getDay(this.symbol,this.date).subscribe(data=>{
        this.stockApiDay=JSON.parse(JSON.stringify( data.values))
        console.log(this.stockApiDay)
        this.stockApi=this.stockApiDay
        
        this.view()
      })
    }
    
  }
  getevent(page:number){
    this.pagination=page
    //this.siNo=(page-1)*10
  }
  refresh(){
    window.location.reload()
  }
  chartOptions = {
    theme: "light2",
    zoomEnabled: true,
    exportEnabled: true,
    title: {
      text:this.name
    },
    subtitles: [{
      text: "Loading Data...",
      fontSize: 24,
      horizontalAlign: "center",
      verticalAlign: "center",
      dockInsidePlotArea: true
    }],
    axisY: {
      title: "Current Price (in USD)",
      prefix: "$"
    },
    data: [{
      type: this.chartType,
      name: "Current Price",
      yValueFormatString: "$#,###.00",
      xValueType: "dateTime",
		  xValueFormatString: "DD MMM YY HH:mm",
      dataPoints: this.dataPoints,
    }]
  }
 
  getChartInstance(chart: object) {
    this.chart = chart;
  }
  
  view() {
    
    this.dataPoints=[]; 

    for(let i = 0; i < this.stockApi.length; i++){
      this.dataPoints.push({x: new Date(this.stockApi[i].datetime), y: Number(this.stockApi[i].open) });
    }

    //this.chart.subtitles[0].remove();
  }
  lineChart(){
    this.chartType='line'
    console.log(this.chartType);
    this.chartOptions = {
      theme: "light2",
      zoomEnabled: true,
      exportEnabled: true,
      title: {
        text:this.name
      },
      subtitles: [{
        text: "",
        fontSize: 24,
        horizontalAlign: "center",
        verticalAlign: "center",
        dockInsidePlotArea: true
      }],
      axisY: {
        title: "Current Price (in USD)",
        prefix: "$"
      },
      data: [{
        type: this.chartType,
        name: "Current Price",
        yValueFormatString: "$#,###.00",
        dataPoints: this.dataPoints,
        xValueType: "dateTime",
        xValueFormatString: "DD MMM YY HH:mm",
      }]
    }
  }
  barChart(){
    this.chartType='column'
    console.log(this.chartType);

    this.chartOptions = {
      theme: "light2",
      zoomEnabled: true,
      exportEnabled: true,
      title: {
        text:this.name
      },
      subtitles: [{
        text: "",
        fontSize: 24,
        horizontalAlign: "center",
        verticalAlign: "center",
        dockInsidePlotArea: true
      }],
      axisY: {
        title: "Current Price (in USD)",
        prefix: "$"
      },
      data: [{
        type: this.chartType,
        name: "Current Price",
        yValueFormatString: "$#,###.00",
        dataPoints: this.dataPoints,
        xValueType: "dateTime",
        xValueFormatString: "DD MMM YY HH:mm",
      }]
    }
  }
  pieChart(){
    this.chartType='pie'
    console.log(this.chartType);

    this.chartOptions = {
      theme: "light2",
      zoomEnabled: true,
      exportEnabled: true,
      title: {
        text:this.name
      },
      subtitles: [{
        text: "",
        fontSize: 24,
        horizontalAlign: "center",
        verticalAlign: "center",
        dockInsidePlotArea: true
      }],
      axisY: {
        title: "Current Price (in USD)",
        prefix: "$"
      },
      data: [{
        type: this.chartType,
        name: "Current Price",
        yValueFormatString: "$#,###.00",
        // xValueType: "this.stock[1].currentPrice",
        dataPoints: this.dataPoints,
        xValueType: "dateTime",
        xValueFormatString: "DD MMM YY HH:mm",
      }]
    }
  }
}
