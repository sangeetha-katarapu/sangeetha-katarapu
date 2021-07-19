import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { urlsData } from '../../../assets/clientConfig'
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  access: boolean = true
  edit: boolean = false;
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

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    if (this.router.url == "/editUser") {
      this.getUserData()
      this.userForm.controls['username'].disable();

      this.edit = true;
      this.access = false;
    }
    else {
      this.edit = false;
      this.access = true;
    }

  }

  getUserData() {
    var jsonObj = {}
    jsonObj['req_method'] = "GET"
    jsonObj['req_url'] = urlsData.getUser
    jsonObj['req_action'] = "getUser"
    jsonObj['req_token'] = sessionStorage.getItem("token")
    console.log("in get user", jsonObj)
    this.adminService.getUserData(jsonObj)
      .subscribe(
        res => {
          if (res['statusCode'] == "200") {
            console.log(res)
            this.userForm.patchValue(res['data']['user'])
          }
          if (res['statusCode'] == "500") {
            this.openSnackBar(res["message"], 5000)
          }
        },
        err => console.error(err)
      )
  }
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.edit) {
      this.userForm.controls.password.clearValidators();
      this.userForm.controls.password.setErrors(null);
      this.userForm.controls.password.setValidators(null);

      this.userForm.controls.confirmPassword.clearValidators();
      this.userForm.controls.confirmPassword.setErrors(null);
      this.userForm.controls.confirmPassword.setValidators(null);
    }
    if (this.userForm.invalid) {

      return;
    }
    else {
      if (this.edit) {
        console.log("in edit", this.userForm, this.userForm.value);


        var jsonObj = {}
        jsonObj['req_method'] = "POST"
        jsonObj['req_url'] = urlsData.updateUser
        jsonObj['req_action'] = "updateUser"
        var jsonBdy = { "user": { "email": this.userForm.value.email } }
        jsonObj['req_body'] = jsonBdy

        this.adminService.getUserData(jsonObj)
          .subscribe(
            res => {
              if (res['statusCode'] == "200") {
                this.openSnackBar("Updated successfully", 5000)
                this.router.navigate(['myblogs'])
              }
              if (res['statusCode'] == "500") {
                this.openSnackBar(res["message"], 5000)
              }
            },
            err => console.error(err)
          )
      }
      else {
        console.log("in esle", this.userForm, this.userForm.value);
        if (this.userForm.value["password"] != this.userForm.value["confirmPassword"]) {
          this.openSnackBar("Password and Confirm Password are not matching", 5000)
          return
        }
        // return
        var jsonObj = {}
        jsonObj['req_method'] = "POST"
        jsonObj['req_url'] = urlsData.registerUser
        jsonObj['req_action'] = "registerUser"
        var jsonNewBdy:any = { "user": { "email": this.userForm.value.email, "password": this.userForm.value.password, "username": this.userForm.value.username } }
        jsonObj['req_body'] = jsonNewBdy

        this.adminService.getUserData(jsonObj)
          .subscribe(
            res => {
              if (res['statusCode'] == "200") {
                this.openSnackBar("Account is created successfully", 5000)

                sessionStorage.setItem('token', res['data']['user']['token']);
                this.auth.getSessionStorage();
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
