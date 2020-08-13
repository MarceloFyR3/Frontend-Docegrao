import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/helpers/generic-form-validation';
import { Observable, fromEvent, merge, Subscription, async } from 'rxjs';
import { Credentials } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  loginForm: FormGroup;
  returnUrl: string;
  subscription: Subscription;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _authService: AuthService) {
    this.validateFormMensage();
  }

  ngOnInit() {
    this.formLogin(new Credentials());
  }

  ngAfterViewInit(): void {
    let controlBlursLogin: Observable<any>[] = this.loginFormRef
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, "blur"));

    this.subscription = merge(...controlBlursLogin).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  @ViewChildren(FormControlName, { read: ElementRef }) loginFormRef: ElementRef[];

  formLogin(credentials: Credentials) {
    this.loginForm = this.formBuilder.group({
      username: [credentials.username, Validators.required],
      password: [credentials.password, Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // alert(this.returnUrl)
  }

  validateFormMensage() {
    this.validationMessages = {
      username: { required: "Usuário obrigátorio" },
      password: { required: "Senha obrigátorio" }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  async onSubmit() {
    if (!this.loginForm.invalid) {
      this.loading = true;

      this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
        .then(async res => {
          console.log(res);
          alert("logado")
          this.loading = false;
        }).catch(error => {
          alert(error.message)
          this.loading = false;
        })

      this.loginForm.reset;
      this.loginForm.clearValidators;
    }
    else {
      this.marckFormGroupTouched(this.loginForm);
    }
  }

  private marckFormGroupTouched(form: FormGroup) {
    form.markAllAsTouched();
    form.updateValueAndValidity();
    this.displayMessage = this.genericValidator.processMessages(form);
  }

}
