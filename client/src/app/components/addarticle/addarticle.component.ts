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
  constructor(private adminService: CommonService,
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

  ngOnInit() {

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      body: ['', [Validators.required]],
      tagList: ['', [Validators.required]],
    });

  }

  get f() { return this.articleForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.articleForm.invalid) {
      return;
    }
    else {
      console.log(this.articleForm, this.articleForm.value);
     
      // return
      var jsonObj = {}
      jsonObj['req_method'] = "POST"
      jsonObj['req_url'] = urlsData.allArticles
      jsonObj['req_action'] = "addArticle"
      var listTag:any=this.articleForm.value.tagList.split(" ")

      var jsonBdy = 
      {
        "article": {
            "title": this.articleForm.value.title,
            "description": this.articleForm.value.description,
            "body": this.articleForm.value.body,
            "tagList": listTag
        }
    }
      jsonObj['req_body'] = jsonBdy    
      jsonObj['req_token'] = sessionStorage.getItem("token")


      this.adminService.getUserData(jsonObj)
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
