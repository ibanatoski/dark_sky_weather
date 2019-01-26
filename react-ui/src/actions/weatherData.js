import * as WeatherApi from "api/weatherApi";

export const FETCH_WEATHER_ZIPCODE_REQUEST = "FETCH_WEATHER_ZIPCODE_REQUEST";
export const FETCH_WEATHER_ZIPCODE_SUCCESS = "FETCH_WEATHER_ZIPCODE_SUCCESS";
export const FETCH_WEATHER_ZIPCODE_FAILURE = "FETCH_WEATHER_ZIPCODE_FAILURE";

//------------------------------------------------------------------------------------------------------------
//
//    School Many
//
//------------------------------------------------------------------------------------------------------------

function fetchWeatherByZipcodeRequest(request) {
  return {
    type: FETCH_WEATHER_ZIPCODE_REQUEST,
    request: { request }
  };
}

function fetchWeatherByZipcodeSuccess(request, json) {
  return {
    type: FETCH_WEATHER_ZIPCODE_SUCCESS,
    request: { request },
    weatherData: json.weatherData,
    locationData: json.locationData,
    receivedAt: Date.now()
  };
}

function fetchWeatherByZipcodeFailure(request) {
  return {
    type: FETCH_WEATHER_ZIPCODE_FAILURE,
    request: { request },
    receivedAt: Date.now()
  };
}

export function fetchWeatherByZipcode(zipcode) {
  return function(dispatch) {
    dispatch(fetchWeatherByZipcodeRequest(zipcode));

    return WeatherApi.fetchWeatherByZipcode(zipcode)
      .then(json => {
        console.log(json);
        return json
          ? dispatch(fetchWeatherByZipcodeSuccess(zipcode, json))
          : dispatch(fetchWeatherByZipcodeFailure(zipcode));
      })
      .catch(error => {
        dispatch(fetchWeatherByZipcodeFailure(zipcode));
      });
  };
}
