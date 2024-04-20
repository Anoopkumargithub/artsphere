import type { AdaptedComponent, ComponentAdapter } from './componentFactory'
import type { MapLocation, MapMarker, WixGoogleMapComponent } from './types'
import { baseComponentAdapter } from './baseAdapter'
import { extendComponentAdapter } from '../helpers/extendAdapter'

export type AdaptedGoogleMapComponent = AdaptedComponent & GoogleMapExtendedApi

interface GoogleMapExtendedApi extends Partial<AdaptedComponent> {
  location: MapLocation
  markers: MapMarker[]
  setCenter: (location: MapLocation) => void
}

export const googleMapAdapter: ComponentAdapter<
  WixGoogleMapComponent,
  AdaptedGoogleMapComponent
> = component => {
  const extendedApi: GoogleMapExtendedApi = {
    setValue(location: MapLocation) {
      component.location = location
    },
    getValue() {
      return component.location
    },
    clear() {
      component.markers = []
    },
    set location(location: MapLocation) {
      component.location = location
    },
    get location() {
      return component.location
    },
    set markers(markers: MapMarker[]) {
      component.markers = markers
    },
    get markers() {
      return component.markers
    },
    setCenter(location) {
      component.setCenter(location)
    },
  }

  return extendComponentAdapter(baseComponentAdapter(component), extendedApi)
}
