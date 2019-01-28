import * as WeatherActions from "../actions/weatherData";

const initialState = {
  geoLoc: null,
  weather: null,
  isLoading: false
};

export function weatherData(state = initialState, action) {
  switch (action.type) {
    // --------------------------------------------------------------------------------------------
    //
    //  Weather
    //
    // --------------------------------------------------------------------------------------------
    case WeatherActions.FETCH_WEATHER_ZIPCODE_REQUEST:
      return Object.assign({}, state, {
        ...state.weather,
        isLoading: true
      });
    case WeatherActions.FETCH_WEATHER_ZIPCODE_FAILURE:
      return Object.assign({}, state, {
        ...state.weather,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_ZIPCODE_SUCCESS:
      console.log(action.locationData);
      return Object.assign({}, state, {
        ...state.weather,
        receivedAt: action.receivedAt,
        weather: action.weatherData,
        geoLoc: action.locationData,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_IP_REQUEST:
      return Object.assign({}, state, {
        ...state.weather,
        isLoading: true
      });
    case WeatherActions.FETCH_WEATHER_IP_FAILURE:
      return Object.assign({}, state, {
        ...state.weather,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_IP_SUCCESS:
      return Object.assign({}, state, {
        ...state.weather,
        receivedAt: action.receivedAt,
        weather: action.weatherData,
        isLoading: false
      });
    default:
      return state;
  }
}
