import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { urlsData } from '../../../assets/clientConfig'
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  feedData: any = []
  feedInnerData: any = { title: "", author: "", image: "", description: "", body: "" }

  constructor(private router:Router,private commonService: CommonService) { }
  ngOnInit(): void {
    this.getMyArticlesData()
  }
  getMyArticlesData() {
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.myArticles+sessionStorage.getItem("uname")
    jsonObj['req_action'] = "getMyArticles"
    jsonObj['req_token'] = sessionStorage.getItem("token")
    this.commonService.getUserData(jsonObj).subscribe(
      res => {
        console.log("getUserData", res)
        this.createArticleData(res['data'])
      },
      err => console.error(err)
    );
  }

  createArticleData(req_data: any) {
    for (var i = 0; i < req_data.articles.length; i++) {
      req_data.articles[i]['id'] = i + 1
      this.feedData.push(req_data.articles[i])
    }
    console.log(this.feedData)
  }

  addArticle(){
    this.router.navigate(['addArticle'])
  }
}
