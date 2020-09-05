import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public missiondata;
  public missiondata_full
  year_array: any;
  apiurl = "https://api.spacexdata.com/v3/launches?limit=100";
  getdata() {
    this.http.get(this.apiurl)
      .subscribe((data) => {
        this.missiondata = Array.from(Object.keys(data), k => data[k]);
        this.missiondata_full = Array.from(Object.keys(data), k => data[k]);
        var temp_year = [];
        this.missiondata.forEach(function (value) {
          temp_year.push(value.launch_year);
        });
        this.year_array = this.removeDuplicates(temp_year);
      });
  }
  constructor(private http: HttpClient) {
    this.getdata();
  }
  removeDuplicates(array) {
    var uniqueArray = [];
    for (var i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
  getYear(year) {
    this.missiondata = this.missiondata_full;
    var temp_array = [];
    this.missiondata.forEach(function (value) {
      if (value.launch_year == parseInt(year)) {
        temp_array.push(value);
      }
    })
    this.missiondata = temp_array;
  }

  resetFilter() {
    this.missiondata = this.missiondata_full;
  }
  launchFilter(launch) {
    var temp = [];
    this.missiondata = this.missiondata_full;
    this.missiondata.forEach(function (value) {
      if (value.launch_success == launch) {
        temp.push(value);
      }
    })
    this.missiondata = temp;
  }

  landFilter(launch) {
    var temp = [];
    this.missiondata = this.missiondata_full;
    this.missiondata.forEach(function (value) {
      if (value.launch_landing == launch) {
        temp.push(value);
      }
    })
    this.missiondata = temp;
  }

  ngOnInit() {
  }
}
