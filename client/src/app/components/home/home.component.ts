import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { urlsData } from '../../../assets/clientConfig'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedData: any = []
  feedInnerData: any = { title: "", author: "", image: "", description: "", body: "" }
  images = [
    { path: '../../../assets/img1.jpg' },
    { path: '../../../assets/img2.jpg' },
    { path: '../../../assets/img3.jpg' },
  ]

  constructor(private commonService: CommonService) { }
  showArticles: boolean = false

  public oneIcon = 'favorite_border';
  public oneIcon1 = 'favorite_border';
  public oneIcon2 = 'favorite';
  public twoIcon = 'bookmark_border';
  public twoIcon1 = 'bookmark_border';
  public twoIcon2 = 'bookmark';

  ngOnInit(): void {
    // this.getTagsData()
    this.getArticlesData()
  }

  getTagsData() {
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.alltags
    this.commonService.getCommonData(jsonObj).subscribe(
      res => {
        console.log("getCommonData", res)
      },
      err => console.error(err)
    );
  }

  getArticlesData() {
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.allArticles
    this.commonService.getCommonData(jsonObj).subscribe(
      res => {
        console.log("getCommonData", res)
        this.createArticleData(res)
      },
      err => console.error(err)
    );
  }

  createArticleData(req_data: any) {
    for (var i = 0; i < req_data.articles.length; i++) {
      req_data.articles[i]['id'] = i + 1
      req_data.articles[i]['like'] = this.oneIcon
      req_data.articles[i]['share'] = this.twoIcon
      this.feedData.push(req_data.articles[i])
    }
    console.log(this.feedData)
    this.showArticles = true
  }
  changeLikeIcon(req_data: any) {
    if (req_data.like == this.oneIcon1)
      req_data.like = this.oneIcon2;
    else
      req_data.like = this.oneIcon1

  }
  changeSaveIcon(req_data: any) {
    if (req_data.share == this.twoIcon1)
      req_data.share = this.twoIcon2;
    else
      req_data.share = this.twoIcon1
  }
}
