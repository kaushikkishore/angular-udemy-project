import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  loadedFeature = "recipe";
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}

/*
not add test cases 
ng g c recipes --spec false 
ng g c recipes/recipe-list --spec false 
ng g c recipes/recipe-detail --spec false 
ng g c recipes/recipe-list/recipe-item --spec false 


ng g c shopping-list --spec false 
ng g c shopping-list --spec false 
ng g c shopping-list/shopping-edit --spec false 

 */
