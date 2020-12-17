import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {


  email: string = "";
  name: string = "";

  isFlight: boolean = false;
  isHotel: boolean = false;
  isInfo: boolean = false;

  dateTo: any;
  dateFrom: any;

  cityTo: string;
  cityFrom: string;

  maxFlight: number;
  maxHotel: number;

  guestNumber: number;

  constructor( private dataService: DataService, private _snackBar: MatSnackBar) {
  }



  ngOnInit(): void {
  }

  createRequestBody(): string {
    return `{
      "customerEmail": "${this.email}", 
      "customerName": "${this.name}",

      "countryData": ${this.isInfo}, 
      "flightBooking": ${this.isFlight}, 
      "hotelBooking":${this.isHotel},

      "dateTo": ${ parseInt((new Date(this.dateFrom).getTime() / 1000).toFixed(0))}, 
      "dateFrom": ${parseInt((new Date(this.dateTo).getTime() / 1000).toFixed(0))},
      
      "cityTo": "${this.cityTo}",
      "cityFrom": "${this.cityFrom}",
      
      "maxPriceHotel": ${this.maxHotel}, 
      "maxPriceFlight": ${this.maxFlight},

      "numberOfGuests": ${this.guestNumber}
      }`
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  sendRequest(): void {
    console.log(this.email, this.name, this.isFlight, this.isHotel, this.isInfo, this.dateTo, this.dateFrom, this.cityTo, this.cityFrom, this.maxFlight, this.maxHotel, this.guestNumber)
    
    const body = this.createRequestBody();

    console.log(body)

    this.dataService.sendTravelRequest(body).subscribe(data => {
      if(data?.customerEmail) {
      this.openSnackBar("An email will be sent to \""+ data?.customerEmail +"\" with travel info.", "x");
      } else {
      this.openSnackBar("An error occured. Please make sure to fill out everything in the form.", "x");

      }
    });

  }

}
