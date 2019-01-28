export function fetchWeatherByZipcode(zipcode) {
  return fetch(`/api/forecast/zipcode/${zipcode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
}

export function fetchWeatherByIp() {
  return fetch(`/api/forecast/ip`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
}

export function fetchWeatherByLocTime(lat, lng, timestamp) {
  return fetch(`/api/forecast/${lat}/${lng}/${timestamp}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
}

export function fetchLocationFromIP() {
  return fetch(`/api/location/ip`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
}
