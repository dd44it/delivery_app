import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges
} from "@angular/core";
import { Browser, Map, map, tileLayer } from "leaflet";
import { UserLocationService } from "src/app/services/user.location.service";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild("map") map: any;
  @Input() userAddress: any;
  location = { lat: 0, lng: 0, };

  constructor(private mapContainer: ElementRef<HTMLElement>, private userLocationService: UserLocationService) {}

  ngOnInit() {
    const locationLocal = localStorage.getItem('location');
    if(!locationLocal){
      this.getUserIpData();
    }
    else {
      this.location = JSON.parse(locationLocal);
      this.showMap('');
    }
  }

  ngAfterViewInit(): void {}

  ngOnChanges(): void {
    console.log(this.userAddress);
    // this.showMap(this.userAddress);
  }

  showMap(address: string) {
    const initialState = { lng: this.location.lng, lat: this.location.lat, zoom: 13 };
    const lefletMap: Map = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const isRetina = Browser.retina;
    const baseUrl = !address ? "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=8ebfe6cd843e4fda9fd95228aef70023" : address;
    const retinaUrl = !address ? "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=" : address;
    const findAddress = `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&format=json&apiKey=8ebfe6cd843e4fda9fd95228aef70023`

    if(address){
      tileLayer(findAddress, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
        apiKey: '8ebfe6cd843e4fda9fd95228aef70023',
        maxZoom: 20,
        id: 'osm-bright',
      } as any)
    }
    else {
      tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
        apiKey: '8ebfe6cd843e4fda9fd95228aef70023',
        maxZoom: 20,
        id: 'osm-bright',
      } as any).addTo(lefletMap);
    }
  
  }

  getUserIpData() {
    this.userLocationService.getUserLocation().subscribe(
      (response: any) => {
        console.log(response)
        this.location.lat = response.location.latitude
        this.location.lng = response.location.longitude
        localStorage.setItem('location', JSON.stringify(this.location))
        this.showMap('')
      },
      (error) => { 
        console.log(error)
      }, )
  }


}
