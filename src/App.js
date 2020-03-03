import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/app.component";
import Form from "./components/form.component";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";

const API_KEY = "9d04b6c7488bd437cba2d213eec141b9";

class App extends Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            description: "",
            error: false
        };
        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        };
    }
    calCelsius(temp) {
        let cell = Math.floor(temp - 273.15);
        return cell;
    }
    getWeatherIcon(icons, rangeID) {
        switch (true) {
            case rangeID >= 200 && rangeID <= 232:
                this.setState({ icon: this.weatherIcon.Thunderstorm });
                break;
            case rangeID >= 300 && rangeID <= 321:
                this.setState({ icon: this.weatherIcon.Drizzle });
                break;
            case rangeID >= 500 && rangeID <= 531:
                this.setState({ icon: this.weatherIcon.Rain });
                break;
            case rangeID >= 600 && rangeID <= 622:
                this.setState({ icon: this.weatherIcon.Snow });
                break;
            case rangeID >= 701 && rangeID <= 781:
                this.setState({ icon: this.weatherIcon.Atmosphere });
                break;
            case rangeID >= 801 && rangeID <= 804:
                this.setState({ icon: this.weatherIcon.Clouds });
                break;
            case rangeID === 800:
                this.setState({ icon: this.weatherIcon.Clear });
                break;
            default:
                this.setState({ icon: this.weatherIcon.Clear });
        }
    }
    getWeather = async e => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if (city && country) {
            const api_call = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
            );
            const response = await api_call.json();
            console.log(response);
            this.setState({
                city: `${response.name}, ${response.sys.country}`,
                celsius: this.calCelsius(response.main.temp),
                temp_max: this.calCelsius(response.main.temp_max),
                temp_min: this.calCelsius(response.main.temp_min),
                description: response.weather[0].description
            });
            this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
        } else {
            this.setState({ error: true });
        }
    };

    render() {
        return (
            <div className="App">
                <Form loadweather={this.getWeather} error={this.state.error} />
                <Weather
                    city={this.state.city}
                    temp_celsius={this.state.celsius}
                    country={this.state.country}
                    temp_max={this.state.temp_max}
                    temp_min={this.state.temp_min}
                    description={this.state.description}
                    weatherIcon={this.state.icon}
                />
            </div>
        );
    }
}

export default App;
