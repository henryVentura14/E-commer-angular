import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zipcode } from '../interfaces/zipcode.interface';

@Injectable({
  providedIn: 'root'
})
export class ZipcodesService {
  zipcode: Zipcode[];

  constructor(public https: HttpClient) { }

  getZipcode(zip: number) {
    return this.https.get(`https://blackisp.herokuapp.com/postalCodes/${zip}`);
  }
}


