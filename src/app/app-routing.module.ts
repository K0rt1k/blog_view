import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegistrationComponent } from "./registration/registration.component"
import { HomeComponent } from "./home/home.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { ArticleComponent } from "./article/article.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'authorization', component: AuthorizationComponent},
    {path: 'article', component: ArticleComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}