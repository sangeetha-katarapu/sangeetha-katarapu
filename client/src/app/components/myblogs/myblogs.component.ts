import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { urlsData } from '../../../assets/clientConfig'
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  feedData: any = []
  showArticle: boolean = false
  feedInnerData: any = { title: "", author: "", image: "", description: "", body: "" }

  constructor(private router: Router, private commonService: CommonService, private auth: AuthenticationService) { }
  ngOnInit(): void {
    this.getMyArticlesData()
  }
  getMyArticlesData() {
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.myArticles + sessionStorage.getItem("uname")
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
    if (this.feedData.length == 0) {
      this.showArticle = false
    }
    else {
      this.showArticle = true
    }
  }

  addArticle() {
    this.router.navigate(['addArticle'])
  }

  editArt(req_data: any) {
    console.log("inedit", req_data)
    this.auth.modifyArtID({
      "art_slug": req_data['slug'],
    })
    this.router.navigate(['editArticle']);
  }

  delArt(req_data: any) {
    console.log(req_data)
    var jsonObj = {}
    jsonObj['req_method'] = "DELETE"
    jsonObj['req_url'] = urlsData.allArticles + "/" + req_data.slug
    jsonObj['req_action'] = "deleteArticle"
    jsonObj['req_token'] = sessionStorage.getItem("token")
    this.commonService.getUserData(jsonObj).subscribe(
      res => {
        console.log("getUserData", res)
        this.feedData = []
        this.getMyArticlesData()
      },
      err => console.error(err)
    );
  }

  viewArticle(req_data:any){
    this.auth.modifyArtID({
      "art_slug": req_data['slug'],
    })
    this.router.navigate(['viewArticle']);
  }
}
