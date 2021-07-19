import { Component, OnInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { urlsData } from '../../../assets/clientConfig'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: string;
  show_password: boolean = false;
  submitted = false;
  userDetails: any = {
    user_id: '',
    password: ''
  };


  @ViewChild("uidInput") uidInput: ElementRef;
  constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private loginService: CommonService,
    private auth: AuthenticationService) {
     
  }
  @HostListener('document:keydown.tab', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    event.preventDefault();
  }
  @ViewChild("input") input: ElementRef;
  @ViewChild('btnRef') button
  onKey(event: KeyboardEvent, action: any) {
    event.preventDefault();

    if (event.key === "Tab") {
      if (action == "uid") {
        this.changeDetector.detectChanges();
        this.input.nativeElement.focus();
        return true
      }
      else if (action == "pwd") {
        this.changeDetector.detectChanges();
        this.button.focus()
        return true
      }
      else
        return false
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.changeDetector.detectChanges();
    this.uidInput.nativeElement.focus();
  }

  get f() { return this.loginForm.controls; }
  showPassword() {
    this.show_password = !this.show_password;
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;

    }
    else {
      var jsonObj = {}
      jsonObj['req_method'] = "POST"
      jsonObj['req_url'] = urlsData.login
      jsonObj['req_action'] = "login"
      var jsonBdy = { "user": { "email": this.userDetails.user_id, "password": this.userDetails.password } }
      jsonObj['req_body'] = jsonBdy
      this.loginService.getUserData(jsonObj)
        .subscribe(
          res => {
            
            if (res['statusCode'] != 200) {
              this.message = 'please check your userid and password';
              this.openSnackBar(this.message)
            }
            else {
              sessionStorage.setItem('token', res['data']['user']['token']);
              this.auth.getSessionStorage();
              this.router.navigate(['myblogs'])
            }

          },
          err => {
            this.message = 'please check your userid and password';
            this.openSnackBar(this.message)
          }
        )
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, "Close", {
      duration: 2000,
    });
  }

  changePwd() {
    if (document.activeElement.id == "loginBtn") {
      this.login()
    }
    else if (document.activeElement.id == "uid") {
      this.changeDetector.detectChanges();
      this.input.nativeElement.focus();
      event.preventDefault()
      return
    }
    if (document.activeElement.id == "pwd") {
      this.changeDetector.detectChanges();
      this.button.focus()
      return
    }
  }
}
