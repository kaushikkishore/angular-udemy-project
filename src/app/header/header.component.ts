import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  styleUrls: ["./header.component.css"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  /**
   *
   */
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {
    this.dataStorageService.saveRecipe();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe();
  }
}
