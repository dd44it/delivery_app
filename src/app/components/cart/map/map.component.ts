import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import { Browser, Map, map, tileLayer, marker, LatLngExpression, icon, LeafletMouseEvent, } from "leaflet";
import { UserLocationService } from "src/app/services/user.location.service";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild("map") map: any;
  @Input() userAddress: any;
  location = { lat: 0, lng: 0, };
  leafletMap: Map | undefined | null;
  userMarker: any;

  constructor(private mapContainer: ElementRef<HTMLElement>, private userLocationService: UserLocationService) {}

  ngOnInit() {
    const locationLocal = localStorage.getItem('location');
    if(!locationLocal){
      this.getUserIpData();
    }
    else {
      this.location = JSON.parse(locationLocal);
      this.showMap();
    }
  }

  ngAfterViewInit(): void {
    if (this.location.lat !== 0 && this.location.lng !== 0) {
      this.showMap();
    }
  }

  ngOnChanges(): void {
    if (this.userAddress) {
      console.log(this.userAddress);
      this.changeMapAddress(this.userAddress);
    }
  }

  ngOnDestroy(): void {
    if (this.leafletMap) {
      this.leafletMap.remove();
    }
  }

  showMap() {
    if (this.leafletMap) {
      this.leafletMap.remove();
    }

    const initialState = { lng: this.location.lng, lat: this.location.lat, zoom: 13 };
    this.leafletMap = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);

    const key = ''

    const isRetina = Browser.retina;
    const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${key}`;
    const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${key}`;

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: key,
      maxZoom: 20,
      id: 'osm-bright',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon-2x.png',
    } as any).addTo(this.leafletMap);

    this.addUserMarker();
  }

  getUserIpData() {
    this.userLocationService.getUserLocation().subscribe(
      (response: any) => {
        console.log(response);
        this.location.lat = response.location.latitude;
        this.location.lng = response.location.longitude;
        localStorage.setItem('location', JSON.stringify(this.location));
        this.showMap();
      },
      (error) => { 
        console.log(error)
      }, )
  }

  changeMapAddress(address: string): void {
    if(!address.length) return
    this.userLocationService.getUserAddress(address).subscribe(
      (response: any) => {
        console.log(response);
        this.location.lat = response.results[0].lat;
        this.location.lng = response.results[0].lon;
        localStorage.setItem('location', JSON.stringify(this.location));
        this.showMap();
      },
      (error) => { 
        console.log(error)
      },)
  }

  addUserMarker() {
    const markerOptions = {
      draggable: true, // Set to true if you want the marker to be draggable
    };

    const userLatLng: LatLngExpression = [this.location.lat, this.location.lng];
    this.userMarker = marker(userLatLng, markerOptions).addTo(this.leafletMap as Map);
  }

}
