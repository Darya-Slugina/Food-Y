import { RouterModule, Routes } from '@angular/router';
import { AddEditDishComponent } from './components/add-edit-dish/add-edit-dish.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { CategoryComponent } from './components/category/category.component';
import { ChatComponent } from './components/chat/chat.component';
import { DishComponent } from './components/dish/dish.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-registration/login-page/login-page.component';
import { RegistrationPageComponent } from './components/login-registration/registration-page/registration-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestaurantInfoComponent } from './components/restaurant-page/restaurant-info/restaurant-info.component';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { RestaurantComponent } from './components/restaurant-page/restaurant/restaurant.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  {
    path: '',
    component: StartPageComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'restaurant', component: RestaurantPageComponent },
      { path: 'restaurant/:restaurant', component: RestaurantComponent },
      { path: 'restaurant/:restaurant/info', component: RestaurantInfoComponent},
      { path: 'menu', component: MenuComponent },
      { path: 'menu/:name', component: CategoryComponent },
      { path: 'menu/:name/:dish', component: DishComponent },
      { path: 'menu/:name/:dish/edit', component: AddEditDishComponent },
      { path: 'favourites', component: FavouritesComponent },
      { path: 'terms', component: TermsAndConditionsComponent },
      { path: 'users', component: AllUsersComponent, children:[
        {
          path: 'chat/:username/:index',
          component: ChatComponent,
          outlet: "sidebar",
        }
      ] },
      { path: 'users/:username', component: UserPageComponent },
      { path: 'users/:username/edit', component: EditProfileComponent },
      { path: 'addNewDish', component: AddEditDishComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
});
