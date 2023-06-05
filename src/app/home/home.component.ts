import { Component } from '@angular/core';
import { StockService } from '../stock.service';
import { Stocks } from '../models/stocks.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _serv:StockService){}
  stock:Stocks[]=[];
  newStock:Stocks[]=[];
  pagination:number=1
  change:number=10
  siNo:number=0
  country:string=''
  symbols:string[]=['AAPL','QQQ','ABML','IXIC','VFIAX',
            'TRP','SVI','MEDV','INFY','SUPERSHAKT','ADYEN','BOTHE',
            'SLBEN','ALMIL','DQ7A','BT.A','MQ1','VOW3','4BD','MAOA','ADS',
            'DUS','XHAM','THYAO','PETR4','7203','511880','002594','NOVNEE',
          'EBS','005930','INVE.B','ORPHA','KNEBV','AMG1L','BTE1R','TKM1T',
        'EQNR','NPN','A3M','NLMK']
  ngOnInit(){
    this._serv.getStocks(this.country).subscribe(data=>{
      let stok= this.stock=JSON.parse(JSON.stringify(data))
      this.stock= stok.data
    });
  }
  getevent(page:number){
    this.pagination=page
    this.siNo=(page-1)*10
  }
  getStocks(country:string){
    
    this._serv.getStocks(country).subscribe(data=>{
      let stok= this.stock=JSON.parse(JSON.stringify(data))
      this.stock= stok.data;
      let ctr=0;
      for(let a in this.stock){
        for(let b in this.symbols){
          if(this.stock[a].symbol===(this.symbols[b])){
            this.newStock[a]=this.stock[a]
            ctr++;            
          }
        }
      }
      
      let myStock: Stocks[] = new Array<Stocks>(ctr);

      let idx=0;
      for(let a=0;a<this.newStock.length;a++){
          if(this.newStock[a]!=null)
            {
              myStock[idx]=this.newStock[a];
              idx++;
            }
      }
      this.stock=myStock;
      console.log(myStock);

    });
  }
  setSym(i:Stocks){
    sessionStorage.clear()
    sessionStorage.setItem('sym',i.symbol)
    sessionStorage.setItem('name',i.name)
  }
}
