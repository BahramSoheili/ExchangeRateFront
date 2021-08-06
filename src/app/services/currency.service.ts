import { Injectable } from '@angular/core'
import { Observable} from 'rxjs'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http'

import { CurrencyInfo } from '../Models/CurrencyInfo';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  Url: string = "https://localhost:44367/Currency"
  constructor(private http: HttpClient){}
  GetCurrency$(currencyInfo: CurrencyInfo): Observable<number> {
    console.log(currencyInfo);
    return this.http.post<number>(this.Url, currencyInfo)
  }
}
@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req);
    }
}

