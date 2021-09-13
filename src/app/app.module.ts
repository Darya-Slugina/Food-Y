import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { GoogleMapsModule } from '@angular/google-maps'

import { AgGridModule } from 'ag-grid-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxStarsModule } from 'ngx-stars';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

//pipes
import { FilterRestaurantsPipe } from './components/side-nav/filterRestaurants.pipe';
import { FilterPipe } from './components/cards/filter.pipe';
import { FilterUsersPipe } from './components/all-users/filterUsers.pipe';

//components
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RestaurantComponent } from './components/restaurant-page/restaurant/restaurant.component';
import { InputComponent } from './components/common/input/input.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { DishComponent } from './components/dish/dish.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { RegistrationPageComponent } from './components/login-registration/registration-page/registration-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { LoginPageComponent } from './components/login-registration/login-page/login-page.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { RestaurantInfoComponent } from './components/restaurant-page/restaurant-info/restaurant-info.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddEditDishComponent } from './components/add-edit-dish/add-edit-dish.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HomePageComponent,
    HeaderComponent,
    SideNavComponent,
    FilterPipe,
    FilterRestaurantsPipe,
    FilterUsersPipe,
    RestaurantComponent,
    InputComponent,
    MenuComponent,
    CategoryComponent,
    DishComponent,
    CommentBoxComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    StartPageComponent,
    FavouritesComponent,
    RestaurantPageComponent,
    RestaurantInfoComponent,
    EditProfileComponent,
    AddEditDishComponent,
    UserPageComponent,
    AllUsersComponent,
    ChatComponent,
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
    MatTooltipModule,
    NgxStarsModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    StoreDevtoolsModule.instrument({
      name: 'FoodY App',
      logOnly: environment.production,
    }),
    AgGridModule.withComponents(),
    BrowserAnimationsModule,
    FormsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
