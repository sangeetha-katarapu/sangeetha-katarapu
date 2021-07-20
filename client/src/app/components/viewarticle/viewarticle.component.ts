import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { urlsData } from '../../../assets/clientConfig'
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.css']
})
export class ViewarticleComponent implements OnInit {


  feedData: any = {}
  feedInnerData: any = { title: "", author: "", image: "", description: "", body: "" }
  showArticle: boolean = false
  private _artSub;
  edit: boolean = false;
  selectedArtSlugID: any
  article_title: any = "Title"
  article_desc: any = "Description"
  article_img: any = "Img"
  article_body: any = "Sample Data"
  article_date: any = "01-01-1998"
  article_author: any = "auth"
  article_bio: any = "bio"
  art_like: any = "favorite_border"
  art_share: any = "bookmark_border"
  public oneIcon1 = 'favorite_border';
  public oneIcon2 = 'favorite';
  public twoIcon1 = 'bookmark_border';
  public twoIcon2 = 'bookmark';
  art_count: any
  constructor(private router: Router, private commonService: CommonService, private auth: AuthenticationService) { }
  ngOnInit(): void {
    this._artSub = this.auth.ArtIDInfo.subscribe(flag => {
      if (flag && flag["art_slug"]) {
        this.edit = true;
        this.selectedArtSlugID = flag["art_slug"];
        this.getArticle(flag["art_slug"])
      }
    })
  }




  ngOnDestroy() {
    this.auth.modifyArtID(null)
    this._artSub.unsubscribe();
  }

  getArticle(slug_id: string) {
    console.log(slug_id)
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.allArticles + "/" + slug_id
    jsonObj['req_action'] = "getArticle"
    jsonObj['req_token'] = sessionStorage.getItem("token")
    this.commonService.getUserData(jsonObj).subscribe(
      res => {
        console.log("getUserData", res)
        this.createArticleData(res['data'])
        this.showArticle = true
      },
      err => console.error(err)
    );

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
      },
      err => console.error(err)
    );
  }

  createArticleData(req_data: any) {
    this.feedData = req_data.article
    this.article_title = req_data.article.title
    this.article_desc = req_data.article.description
    this.article_img = req_data.article.author['image']
    this.article_author= req_data.article.author['username']
    this.article_bio = req_data.article.author['bio']
    this.article_body = req_data.article.body
    this.art_count = req_data.article.favoritesCount
    this.article_date = req_data.article.createdAt.split("T")[0]
    if (req_data.article.favorited)
      this.art_like=this.oneIcon2;
    else
      this.art_like = this.oneIcon1;
    console.log(this.feedData)
  }

  addArticle() {
    this.router.navigate(['addArticle'])
  }
  changeLikeIcon() {
    var req_data = this.feedData
    if (req_data.like == this.art_like)
      this.art_like = this.oneIcon2;
    else
      this.art_like = this.oneIcon1

  }
  changeSaveIcon() {
    var req_data = this.feedData
    if (req_data.share == this.art_share)
      this.art_share= this.twoIcon2;
    else
      this.art_share = this.twoIcon1
  }

}
