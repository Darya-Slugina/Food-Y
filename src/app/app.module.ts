import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { CardsComponent } from './components/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxStarsModule } from 'ngx-stars';
import { FilterPipe } from './components/cards/filter.pipe';
import { RestaurantComponent } from './components/restaurant-page/restaurant/restaurant.component';
import { InputComponent } from './components/common/input/input.component';
import { FilterRestaurantsPipe } from './components/side-nav/filterRestaurants.pipe';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './components/category/category.component';
import { DishComponent } from './components/dish/dish.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { RegistrationPageComponent } from './components/login-registration/registration-page/registration-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { LoginPageComponent } from './components/login-registration/login-page/login-page.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { StoreModule } from '@ngrx/store';
// import { foodsReducer } from './store/food.reducers';
// import { userReducer } from './store/user.reducers';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { FoodResolverService } from './shared/services/food-resolver.service';
// import { FoodService } from './shared/services/food.service';
import { AgGridModule } from 'ag-grid-angular';
import { RestaurantInfoComponent } from './components/restaurant-page/restaurant-info/restaurant-info.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddEditDishComponent } from './components/add-edit-dish/add-edit-dish.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { UserService } from './shared/services/user.service';
import { ChatComponent } from './components/chat/chat.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';



// let rootReducer = {
//   dishes: foodsReducer,
//   user: userReducer,
// };

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
    SidebarComponent,
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
    MatButtonModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    // StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      name: 'FoodY App',
      logOnly: environment.production,
    }),
    AgGridModule.withComponents(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// platformBrowserDynamic().bootstrapModule(AppModule);
