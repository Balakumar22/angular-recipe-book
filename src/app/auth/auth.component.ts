import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponse } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;
  authForm: FormGroup;

  authSub: Subscription;
  closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.authService.user.subscribe((user) => console.log(user));
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponse>;

    if (!this.isLoginMode) {
      authObs = this.authService.signUp(email, password);
    } else {
      authObs = this.authService.login(email, password);
    }

    authObs.subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage: string) => {
        // this.error = errorMessage;
        this.showAlertPopUp(errorMessage);
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  showAlertPopUp(error: string) {
    const alertCmp =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertModalComponent
      );

    // alertCmp.inputs([{ propName: 'message', templateName: error }]);

    const hostContainerRef = this.alertHost.viewContainerRef;

    hostContainerRef.clear();

    const componentRef = hostContainerRef.createComponent(alertCmp);

    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostContainerRef.clear();
    });
  }
}
