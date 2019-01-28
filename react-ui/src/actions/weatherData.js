import * as WeatherApi from "api/weatherApi";

export const FETCH_WEATHER_ZIPCODE_REQUEST = "FETCH_WEATHER_ZIPCODE_REQUEST";
export const FETCH_WEATHER_ZIPCODE_SUCCESS = "FETCH_WEATHER_ZIPCODE_SUCCESS";
export const FETCH_WEATHER_ZIPCODE_FAILURE = "FETCH_WEATHER_ZIPCODE_FAILURE";

export const FETCH_WEATHER_IP_REQUEST = "FETCH_WEATHER_IP_REQUEST";
export const FETCH_WEATHER_IP_SUCCESS = "FETCH_WEATHER_IP_SUCCESS";
export const FETCH_WEATHER_IP_FAILURE = "FETCH_WEATHER_IP_FAILURE";

export const FETCH_WEATHER_LOC_TIME_REQUEST = "FETCH_WEATHER_LOC_TIME_REQUEST";
export const FETCH_WEATHER_LOC_TIME_SUCCESS = "FETCH_WEATHER_LOC_TIME_SUCCESS";
export const FETCH_WEATHER_LOC_TIME_FAILURE = "FETCH_WEATHER_LOC_TIME_FAILURE";

export const FETCH_IP_LOCATION_REQUEST = "FETCH_IP_LOCATION_REQUEST";
export const FETCH_IP_LOCATION_SUCCESS = "FETCH_IP_LOCATION_SUCCESS";
export const FETCH_IP_LOCATION_FAILURE = "FETCH_IP_LOCATION_FAILURE";

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
  console.log("FETCH_WEATHER_IP_SUCCESS");

  return {
    type: FETCH_WEATHER_IP_SUCCESS,
    locationData: json.locationData,
    weatherData: json.weatherData,
    receivedAt: Date.now()
  };
}

function fetchWeatherByIpFailure() {
  console.log("FETCH_WEATHER_IP_FAILURE");
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
        console.log("json", json);
        return json
          ? dispatch(fetchWeatherByIpSuccess(json))
          : dispatch(fetchWeatherByIpFailure());
      })
      .catch(error => {
        dispatch(fetchWeatherByIpFailure());
      });
  };
}

//------------------------------------------------------------------------------------------------------------
//
//    Fetch Weather by Location and Time
//
//------------------------------------------------------------------------------------------------------------
function fetchWeatherByLocTimeRequest() {
  return {
    type: FETCH_WEATHER_LOC_TIME_REQUEST
  };
}

function fetchWeatherByLocTimeSuccess(request, json) {
  return {
    type: FETCH_WEATHER_LOC_TIME_SUCCESS,
    request: request,
    weatherData: json.hourly,
    receivedAt: Date.now()
  };
}

function fetchWeatherByLocTimeFailure() {
  return {
    type: FETCH_WEATHER_LOC_TIME_FAILURE,
    receivedAt: Date.now()
  };
}

export function fetchHourlyWeatherByLocationTime(lat, lng, timestamp) {
  var request = { lat, lng, timestamp };
  return function(dispatch) {
    dispatch(fetchWeatherByLocTimeRequest());

    return WeatherApi.fetchWeatherByLocTime(lat, lng, timestamp)
      .then(json => {
        return json
          ? dispatch(fetchWeatherByLocTimeSuccess(request, json))
          : dispatch(fetchWeatherByLocTimeFailure());
      })
      .catch(error => {
        dispatch(fetchWeatherByLocTimeFailure());
      });
  };
}

//------------------------------------------------------------------------------------------------------------
//
//    Location By IP
//
//------------------------------------------------------------------------------------------------------------

function fetchLocationByIPRequest() {
  return {
    type: FETCH_IP_LOCATION_REQUEST
  };
}

function fetchLocationByIPSuccess(json) {
  return {
    type: FETCH_IP_LOCATION_SUCCESS,
    locationData: json.locationData,
    receivedAt: Date.now()
  };
}

function fetchLocationByIPFailure(request) {
  return {
    type: FETCH_IP_LOCATION_FAILURE,
    receivedAt: Date.now()
  };
}

export function fetchLocationByIP() {
  return function(dispatch) {
    dispatch(fetchLocationByIPRequest());

    return WeatherApi.fetchLocationFromIP()
      .then(json => {
        return json && json.code !== 400
          ? dispatch(fetchLocationByIPSuccess(json))
          : dispatch(fetchLocationByIPFailure());
      })
      .catch(error => {
        dispatch(fetchLocationByIPFailure());
      });
  };
}
