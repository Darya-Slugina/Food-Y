import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { CardsComponent } from './components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
// import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
// import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { NgxStarsModule } from 'ngx-stars';
import { FilterPipe } from './components/cards/filter.pipe';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { InputComponent } from './components/common/input/input.component';
import { FilterRestaurantsPipe } from './components/side-nav/filterRestaurants.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { DishComponent } from './components/dish/dish.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { RegistrationPageComponent } from './components/login-registration/registration-page/registration-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { LoginPageComponent } from './components/login-registration/login-page/login-page.component';
import { SignUpComponent } from './components/login-registration/login-page/sign-up/sign-up.component';
import { SignInComponent } from './components/login-registration/login-page/sign-in/sign-in.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { foodsReducer } from './store/food.reducers';
import { userReducer } from './store/user.reducers';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FoodResolverService } from './shared/services/food-resolver.service';
import { FoodService } from './shared/services/food.service';


let rootReducer = {
  dishes: foodsReducer,
  user: userReducer
}

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HomePageComponent,
    HeaderComponent,
    SideNavComponent,
    FilterPipe,
    FilterRestaurantsPipe,
    RestaurantComponent,
    InputComponent,
    MenuComponent,
    CategoryComponent,
    DishComponent,
    CommentBoxComponent,
    SignInComponent,
    SignUpComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    StartPageComponent,
    FavouritesComponent,
    RestaurantPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatTooltipModule,
    // CdkVirtualScrollViewport,
    // CdkScrollableModule,
    NgxStarsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      name: 'FoodY App',
      logOnly: environment.production
    }),
  ],
  providers: [FoodService],
  bootstrap: [AppComponent]
})
export class AppModule { }


