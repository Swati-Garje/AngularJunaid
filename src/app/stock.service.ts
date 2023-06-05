import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockApi } from './models/stockApi.model';
import { Stocks } from './models/stocks.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private _http:HttpClient) { }
  getApi(sym:string){
    return this._http.get<StockApi[]>(`https://api.twelvedata.com/time_series?symbol=${sym}&interval=30min&apikey=0975893c35e04bc59419ad713796a678`)
  }
  getStocks(con:string){
    return this._http.get<Stocks[]>(`https://api.twelvedata.com/stocks?country=${con}`)
  }
  getDay(sym:string,strt:Date){
    return this._http.get<StockApi[]>(`https://api.twelvedata.com/time_series?symbol=${sym}&interval=30min&date=${strt}&apikey=0975893c35e04bc59419ad713796a678`)
  }
  // getApi(){
  //   return this._http.get<StockApi[]>("https://api.twelvedata.com/time_series?symbol=PSF&interval=1min&apikey=0975893c35e04bc59419ad713796a678")
  // }
  // getStocks(){
  //   return this._http.get<Stocks[]>("https://api.twelvedata.com/stocks?country=India")
  // }
}
