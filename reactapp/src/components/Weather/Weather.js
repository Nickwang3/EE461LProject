import React from "react";
import ApiService from "../../api/ApiService";

const apiService = ApiService.getInstance();

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      weather: null,
    };
  }

  componentDidMount() {
    apiService
      .getCurrentWeatherByTeamId(this.props.team_id)
      .then(result => {
        this.setState({
          isLoaded: true,
          weather: result.data,
        })
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { weather } = this.state;
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>At the Ball Park</h1>
          <h2>Today's Weather: {weather.hourly.summary}</h2>
          <h3>Currently: {weather.currently.summary}</h3>
          <h4>Current Temperature: {weather.currently.temperature} &#x2109;</h4>
          <h4>Feels Like: {weather.currently.apparentTemperature} &#x2109;</h4>
          <h4>Precipitation Probability: {weather.currently.precipProbability}</h4>
          <h4>Humidity: {weather.currently.humidity}</h4>
          <h4>Cloud Coverage: {weather.currently.cloudCover}</h4>
        </div>
      )
    }
  }
} export default Weather;