import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './loginRegister/login';
import { RegisterComponent } from './loginRegister/register';
import { enableProdMode } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UpperBannerComponent } from './upper-banner/upper-banner.component';
import { UsersManagerComponent } from './users-manager/users-manager.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';;
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import { DateFromNowPipe } from './date-from-now.pipe';;
import { PostUploadComponent } from './post-upload/post-upload.component';
import { DemoMaterialModule } from './material-module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import { UsersTopicsComponent } from './users-topics/users-topics.component'

//enableProdMode();
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        InfiniteScrollModule,
        DemoMaterialModule,
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        BrowserAnimationsModule

    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UpperBannerComponent,
        UsersManagerComponent,
        UserSettingsComponent,
        FeedComponent,
        DateFromNowPipe,
        PostUploadComponent,
        PostComponent,
        UsersTopicsComponent
    ],

    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }