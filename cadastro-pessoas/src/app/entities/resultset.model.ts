import { Observable } from "rxjs";

export class ResultSet 
{
    
    public count: number;
    public result: Observable<any[]>;

    constructor(count: number, result: Observable<any[]>){
        this.count = count;
        this.result = result;
    }

    
}