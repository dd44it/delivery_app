import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  EventEmitter,
} from "@angular/core";
import { Browser, Map, map, tileLayer, marker, LatLngExpression, icon, LeafletMouseEvent, Marker, LeafletEvent } from "leaflet";
import { UserLocationService } from "src/app/services/user.location.service";
import { createLeafletMarker } from "src/app/LeafletMarker";

@Component({
  selector: "app-map",
  templateUrl: "map.component.html",
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild("map") map: any;
  @Input() userAddress: any;
  location = { lat: 0, lng: 0, };
  leafletMap: Map | undefined | null;
  @Output() address: EventEmitter<string> = new EventEmitter<string>();
  marker?: Marker;

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
      this.addMapClickEvent();
      this.addMapDragEvent();
    }
  }

  ngOnChanges(): void {
    if (this.userAddress) {
      console.log(this.userAddress);
      this.changeMapAddress(this.userAddress);
      this.updateUserPosition(this.location.lat, this.location.lng);
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

    const initialState = { lng: this.location.lng, lat: this.location.lat, zoom: 17 };
    this.leafletMap = map(this.mapContainer.nativeElement).setView([initialState.lat, initialState.lng], initialState.zoom);
    const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileLayer(tileLayerUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(this.leafletMap as Map);

    this.marker = createLeafletMarker([initialState.lat, initialState.lng], {}).addTo(this.leafletMap as Map);
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

  addMapClickEvent(): void {
    if(this.leafletMap){
      this.leafletMap.on('click', (event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        this.getAddressFromLocation(lat, lng);
      });
    } 
  }

  addMapDragEvent(): void {
    this.marker!.dragging!.enable();
    this.marker!.on('dragend', (event: LeafletEvent) => {
      const markerPosition = event.target.getLatLng();
      const lat = markerPosition.lat;
      const lng = markerPosition.lng;
      this.getAddressFromLocation(lat, lng);
    });
  }

  getAddressFromLocation(lat: number, lng: number): void {
    this.userLocationService.getAddressFromLocation(lat, lng).subscribe(
      (response: any) => {
        console.log(response);
        const userAddress = response.results[0].address_line1;
        this.address.emit(userAddress);
        this.location.lat = response.results[0].lat;
        this.location.lng = response.results[0].lon;
        localStorage.setItem('userAddress', userAddress);
        localStorage.setItem('location', JSON.stringify(this.location));
        this.updateUserPosition(lat, lng);
      },
      (error) => { 
        console.log(error);
      },
    )
  }

  updateUserPosition(lat: number, lng: number): void {
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = createLeafletMarker([lat, lng], {}).addTo(this.leafletMap as Map);
      this.addMapDragEvent();
    }
  }

}
