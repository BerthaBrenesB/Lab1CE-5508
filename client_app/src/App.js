import logo from './logo.svg';
import './App.css';
import { ParkingSpaces } from './components/ParkingSpaces';
import { ParkingReservations } from './components/ParkingReservations';
import { ParkingClient } from './client/ParkingClient';
import React from 'react';


export class App extends React.Component {
  parkingClient = new ParkingClient();

  constructor()  {
    super();
    this.state = {
      spaces: [],
      reservations: []
    }
  }
  
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const newSpaces = await this.parkingClient.getParkingSpacesData();
    const newRerservations = await this.parkingClient.getParkingReservationsData();
    this.setState({
      spaces: newSpaces,
      reservations: newRerservations
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Spaces:</h1>
        <ParkingSpaces spaces={this.state.spaces}></ParkingSpaces>
        <h1>Reservations:</h1>
        <ParkingReservations reservations={this.state.reservations}></ParkingReservations>
      </div>
    );
  }
}
