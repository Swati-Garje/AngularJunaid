import { Pipe, PipeTransform } from "@angular/core";
import { Stocks } from "../models/stocks.model";

@Pipe({name:'search',pure:false})
export class SearchPipe implements PipeTransform{
    transform(value: Stocks[], search: string) {
       let result= value.filter(x=>(
            x.country .startsWith(search)
       ))
        return result;
    }

}