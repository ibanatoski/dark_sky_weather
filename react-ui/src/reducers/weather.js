import * as WeatherActions from "../actions/weatherData";

const initialState = {
  geoLoc: null,
  weather: null,
  isLoading: false,
  week: {}
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
        ...state.geoLoc,
        ...state.week,
        isLoading: true
      });
    case WeatherActions.FETCH_WEATHER_ZIPCODE_FAILURE:
      return Object.assign({}, state, {
        ...state.weather,
        ...state.geoLoc,
        ...state.week,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_ZIPCODE_SUCCESS:
      return Object.assign({}, state, {
        ...state.geoLoc,
        ...state.week,
        receivedAt: action.receivedAt,
        weather: action.weatherData,
        geoLoc: action.locationData,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_IP_REQUEST:
      return Object.assign({}, state, {
        ...state.weather,
        ...state.geoLoc,
        ...state.week,
        isLoading: true
      });
    case WeatherActions.FETCH_WEATHER_IP_FAILURE:
      console.log("FETCH_WEATHER_IP_FAILURE");
      return Object.assign({}, state, {
        ...state.weather,
        ...state.geoLoc,
        ...state.week,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_IP_SUCCESS:
      console.log(action.locationData);
      var locationData = { ...action.locationData };
      locationData.formatted_address =
        locationData.city +
        ", " +
        locationData.region_code +
        " " +
        locationData.zipcode +
        ", " +
        locationData.country_code;
      return Object.assign({}, state, {
        geoLoc: action.locationData,
        weather: action.weatherData,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_LOC_TIME_REQUEST:
      return Object.assign({}, state, {
        ...state.weather,
        ...state.geoLoc,
        ...state.week,
        isLoading: true
      });
    case WeatherActions.FETCH_WEATHER_LOC_TIME_SUCCESS:
      var week = { ...state.week };
      week[`${action.request.timestamp}`] = action.weatherData;
      return Object.assign({}, state, {
        ...state.weather,
        ...state.geoLoc,
        week: week,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    case WeatherActions.FETCH_WEATHER_LOC_TIME_FAILURE:
      return Object.assign({}, state, {
        ...state.weather,
        ...state.geoLoc,
        ...state.week,
        receivedAt: action.receivedAt,
        isLoading: false
      });
    default:
      return state;
  }
}
