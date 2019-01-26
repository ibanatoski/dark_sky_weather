export function fetchWeatherByZipcode(zipcode) {
  return fetch(`/api/weather/zipcode/${zipcode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(response => response.json());
}
