import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { DishComponent } from './components/dish/dish.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-registration/login-page/login-page.component';
import { RegistrationPageComponent } from './components/login-registration/registration-page/registration-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RestaurantPageComponent } from './components/restaurant-page/restaurant-page.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { FoodResolverService } from './shared/services/food-resolver.service';
import { UserResolverService } from './shared/services/user-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
  { path: '', component: StartPageComponent, children:[
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'restaurant', component: RestaurantPageComponent },
    { path: 'restaurant/:restaurant', component: RestaurantComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'menu/:name', component: CategoryComponent },
    { path: 'menu/:name/:dish', component: DishComponent,  resolve: {dishes: FoodResolverService}  },
    { path: 'favourites', component: FavouritesComponent,  resolve: {dishes: FoodResolverService} },
    { path: 'terms', component: TermsAndConditionsComponent },
    { path: '**', component: PageNotFoundComponent },
  ] },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled'
});
