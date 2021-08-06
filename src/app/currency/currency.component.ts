import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyInfo } from '../Models/CurrencyInfo';
import { CurrencyService } from '../services/currency.service';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})

export class CurrencyComponent implements  OnDestroy {
  title = 'ExchangeRateFront'
  result = false
  sub = new Subscription  
  get source() {
    return this.form.get("source");
  }
  get destination() {
    return this.form.get("destination");
  }
  get amount() {
    return this.form.get("amount");
  }
  form: FormGroup = this.fb.group({
    source: ['', Validators.required],
    destination: ['', Validators.required],
    amount: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
     Validators.maxLength(12)]]    
  })
  Rate: number = 0
  currenciesList = [
   "USD","AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","EGP","EUR","GBP","JPY","AED","AED" ]; 


  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder) {       
  }
  onSubmit(form: FormGroup) {   
    this.addCurrencyInfo(form.value)
    console.log("form =", form )
  }
  addCurrencyInfo(value: any) {
    var currencyInfo: CurrencyInfo = {
      source : value.source, 
      destination : value.destination, 
      amount : value.amount    
    }    
    console.log("currencyInfo = ", currencyInfo)

     this.sub = this.currencyService.GetCurrency$(currencyInfo).subscribe(x=> {
      this.Rate = x 
      this.result = true
      console.log('rate = ', x)
      })
    }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
