import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {
  header: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) {
  }

  validateEmail(email) {
    let data = {
      "email": email
    };
    return this.httpClient.post(environment.urlPHP + 'verify-email', data, { headers: this.header});
  }

  getSelectAplha() {
    return this.httpClient.get(environment.urlPHP + 'select-alpha', { headers: this.header});
  }

  setTable(table) {
    let table_string = JSON.stringify(table);
    sessionStorage.setItem('table', table_string);
  }

  getTable() {
    let table = sessionStorage.getItem('table');
    if (isNotNullOrUndefined(table)) {
      return JSON.parse(table);
    } else {
      return [];
    }
  }
}
