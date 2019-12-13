import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-header",
  styleUrls: ["./header.component.css"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  // This is event emitting
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
