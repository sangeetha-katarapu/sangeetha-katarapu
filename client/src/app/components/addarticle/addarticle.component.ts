import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { urlsData } from '../../../assets/clientConfig'
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddarticleComponent implements OnInit {

  

  articleForm: FormGroup;
  submitted = false;
  constructor(private commonService: CommonService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService,
    private snackBar: MatSnackBar) {
  }
  rolevalue: string
  usrEmpGrp: any
  openSnackBar(message, dur) {
    this.snackBar.open(message, "Close", {
      duration: dur,
    });
  }

  private _artSub;
  edit: boolean = false;
  selectedArtSlugID:any
  ngOnInit() {

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagList: ['', [Validators.required]],
    });
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
  get f() { return this.articleForm.controls; }

getArticle(slug_id:string){
    console.log(slug_id)
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.allArticles + "/" + slug_id
    jsonObj['req_action'] = "getArticle"
    jsonObj['req_token'] = sessionStorage.getItem("token")
    this.commonService.getUserData(jsonObj).subscribe(
      res => {
        console.log("getUserData", res)
        res['data']['article']['tagList']=res['data']['article']['tagList'].toString()
            this.articleForm.patchValue(res['data']['article'])
      },
      err => console.error(err)
    );
  
}
  onSubmit() {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }
    else {
      
     var listTag:any=this.articleForm.value.tagList.split(",")
     var jsonBdy = 
      {
        "article": {
            "title": this.articleForm.value.title,
            "description": this.articleForm.value.description,
            "body": this.articleForm.value.body,
            "tagList": listTag
        }
    }
      if(this.edit){
    console.log(listTag)      
      var jsonObj = {}
      jsonObj['req_method'] = "PUT"
      jsonObj['req_url'] = urlsData.allArticles+"/"+this.selectedArtSlugID
      jsonObj['req_action'] = "editArticle"
      
      jsonObj['req_body'] = jsonBdy    
      jsonObj['req_token'] = sessionStorage.getItem("token")
 this.commonService.getUserData(jsonObj)
        .subscribe(
          res => {
            if (res['statusCode'] == "200") {
              this.openSnackBar("Article is edited successfully", 5000)
              this.router.navigate(['myblogs'])
            }
            if (res['statusCode'] == "500") {
              this.openSnackBar(res["message"], 5000)
            }
          },
          err => console.error(err)
        )
      }
      else{
      console.log(this.articleForm, this.articleForm.value);
      // return
      var jsonObj = {}
      jsonObj['req_method'] = "POST"
      jsonObj['req_url'] = urlsData.allArticles
      jsonObj['req_action'] = "addArticle"
      
      jsonObj['req_body'] = jsonBdy    
      jsonObj['req_token'] = sessionStorage.getItem("token")


      this.commonService.getUserData(jsonObj)
        .subscribe(
          res => {
            if (res['statusCode'] == "200") {
              this.openSnackBar("Article is created successfully", 5000)
              this.router.navigate(['myblogs'])
            }
            if (res['statusCode'] == "500") {
              this.openSnackBar(res["message"], 5000)
            }
          },
          err => console.error(err)
        )
    }
    }
  }

}
