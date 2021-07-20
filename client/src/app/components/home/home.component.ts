import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { urlsData } from '../../../assets/clientConfig'
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  feedData: any = []
  feedInnerData: any = { title: "", author: "", image: "", description: "", body: "" }
  images = [
    { path: '../../../assets/img4.jpg' },
    { path: '../../../assets/img1.jpg' },
    { path: '../../../assets/img2.jpg' },
    { path: '../../../assets/img3.jpg' },
  ]

  constructor(private router: Router, private snackBar: MatSnackBar, private commonService: CommonService, private auth: AuthenticationService) { }
  showArticles: boolean = false

  public oneIcon = 'favorite_border';
  public oneIcon1 = 'favorite_border';
  public oneIcon2 = 'favorite';
  public twoIcon = 'bookmark_border';
  public twoIcon1 = 'bookmark_border';
  public twoIcon2 = 'bookmark';
  now_cli: any = ""
  now_temp: any = ""
  now_pre: any = ""
  now_hum: any = ""
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
        this.getWeatherData()
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

  viewArticle(req_data: any) {
    var checkLogin = sessionStorage.getItem("uname")
    if (checkLogin) {
      this.auth.modifyArtID({
        "art_slug": req_data['slug'],
      })
      this.router.navigate(['viewArticle']);
    }
    else {
      this.openSnackBar("Please login to view the article!", 3000)
      this.router.navigate(['login']);

    }
  }
  openSnackBar(msg, dur) {
    this.snackBar.open(msg, "Close", {
      duration: dur,
    });
  }

  getWeatherData(){
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.weatherUrl
    this.commonService.getCommonData(jsonObj).subscribe(
      res => {
        console.log("getWeatherData", res)
        this.now_cli = res['weather'][0].description
        this.now_temp=res['main'].temp
        this.now_pre = res['main'].pressure
        this.now_hum = res['main'].humidity
        
      },
      err => console.error(err)
    );
  }
}
