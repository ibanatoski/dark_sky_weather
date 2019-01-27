import * as WeatherApi from "api/weatherApi";

export const FETCH_WEATHER_ZIPCODE_REQUEST = "FETCH_WEATHER_ZIPCODE_REQUEST";
export const FETCH_WEATHER_ZIPCODE_SUCCESS = "FETCH_WEATHER_ZIPCODE_SUCCESS";
export const FETCH_WEATHER_ZIPCODE_FAILURE = "FETCH_WEATHER_ZIPCODE_FAILURE";

export const FETCH_WEATHER_IP_REQUEST = "FETCH_WEATHER_IP_REQUEST";
export const FETCH_WEATHER_IP_SUCCESS = "FETCH_WEATHER_IP_SUCCESS";
export const FETCH_WEATHER_IP_FAILURE = "FETCH_WEATHER_IP_FAILURE";

//------------------------------------------------------------------------------------------------------------
//
//    Forecast By Zipcode
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

//------------------------------------------------------------------------------------------------------------
//
//    Forecast By IP
//
//------------------------------------------------------------------------------------------------------------
function fetchWeatherByIpRequest() {
  return {
    type: FETCH_WEATHER_IP_REQUEST
  };
}

function fetchWeatherByIpSuccess(json) {
  return {
    type: FETCH_WEATHER_IP_SUCCESS,
    weatherData: json.weatherData,
    receivedAt: Date.now()
  };
}

function fetchWeatherByIpFailure() {
  return {
    type: FETCH_WEATHER_IP_FAILURE,
    receivedAt: Date.now()
  };
}

export function fetchWeatherByIp() {
  return function(dispatch) {
    dispatch(fetchWeatherByIpRequest());

    return WeatherApi.fetchWeatherByIp()
      .then(json => {
        console.log("fetchWeatherByIp", json);
        return json
          ? dispatch(fetchWeatherByIpSuccess(json))
          : dispatch(fetchWeatherByIpFailure());
      })
      .catch(error => {
        dispatch(fetchWeatherByIpFailure());
      });
  };
}
