import { writable } from 'svelte/store'
import { capAmountToHundred } from '../types/types'

type vehicleStatusType = {
  engineColor: string,
  altitude: number,
  engine: number,
  speed: number,
  show: boolean,
  showAltitude: boolean,
  showSeatBelt: boolean,
  showSquare: boolean,
  showSquareBorder: boolean,
  ShowCircle: boolean,
  showCircleBorder: boolean,
  seatbeltColor: string,
  beltOpacity: number,
}

type vehicleHudUpdateMessageType = {
  show: boolean,
  isPaused: boolean,
  seatbelt: boolean,
  speed: number,
  engine: number,
  altitude: number,
  showAltitude: boolean,
  showSeatbelt: boolean,
  showSquareB: boolean,
  showCircleB: boolean, 
  beltOpacity: number,
}

type vehicleHudShowMessage = {
  show: boolean,
  seatbelt: boolean,
}

const store = () => {

  const vehicleStatusState: vehicleStatusType = {
    engineColor: "#FFFFFF",
    altitude: 0,
    engine: 0,
    speed: 0,
    show: false,
    showAltitude: false,
    showSeatBelt: false,
    showSquare: false,
    showSquareBorder: false,
    ShowCircle: false,
    showCircleBorder: false,
    seatbeltColor: "#e85b14",
    beltOpacity: 0.8,
  }

  const { subscribe, set, update } = writable(vehicleStatusState);

  const methods = {
    receiveShowMessage(data: vehicleHudShowMessage) {
      update(state => {
        state.show = data.show;
        state.showSeatBelt = data.seatbelt;
        return state;
      })
    },
    receiveUpdateMessage(data: vehicleHudUpdateMessageType) {
      update(state => {
        state.show = data.show;
        state.speed = data.speed;
        state.altitude = data.altitude;
        state.engine = capAmountToHundred(data.engine);
        state.showSeatBelt = data.showSeatbelt;
        state.showAltitude = data.showAltitude;
        state.showSquareBorder = data.showSquareB;
        state.showCircleBorder = data.showCircleB;

        if (data.seatbelt) {
          state.showSeatBelt = false;
          state.beltOpacity = 0.3
        } else {
          state.showSeatBelt = true;
          state.beltOpacity = 0.8
        }

        if (data.engine <= 45) {
          state.engineColor = "#ff0000";
        } else if (data.engine <= 75 && data.engine >= 46 ) {
          state.engineColor = "#dd6e14";
        } else if(data.engine <= 100) {
          state.engineColor = "#FFFFFF";
        } 

        if (data.isPaused) {
          state.show = false;
        }

        return state;
      });
    }
  }

  return {
    subscribe,
    set,
    update,
    ...methods
  }
}

export default store();