import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { urlsData } from '../../../assets/clientConfig'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getTagsData()
  }

  getTagsData() {
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.alltags
    this.commonService.getTags(jsonObj).subscribe(
      res => {
        console.log("getTagsData", res)
      },
      err => console.error(err)
    );
  }
}
