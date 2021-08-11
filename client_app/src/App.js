import logo from './logo.svg';
import './App.css';
import { ParkingSpaces } from './components/ParkingSpaces';
import { ParkingReservations } from './components/ParkingReservations';
import { ParkingClient } from './client/ParkingClient';
import React from 'react';


export class App extends React.Component {
  parkingClient = new ParkingClient();

  constructor() {
    super();
    this.state = {
      spaces: [],
      reservations: []
    }
    this.createNewSpace=this.createNewSpace.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }



  async loadData() {
    const newRerservations = await this.parkingClient.getParkingReservationsData();
    const newSpaces = await this.parkingClient.getParkingSpacesData();
    // const spaceResult = await 
    // this.parkingClient.createParkingSpace();
    // const reservationResult = await this.parkingClient.createParkingReservation("123425", "Gustavo Segura", "8888-8888");



    this.setState({
      spaces: newSpaces,
      reservations: newRerservations
    });
  }

  createNewSpace() {
      this.parkingClient.createParkingSpace().then(this.loadData());
  }

  render() {
    return (
      <div className="App">
        <h1>Spaces:</h1>
        <ParkingSpaces spaces={this.state.spaces}></ParkingSpaces>
        <button onClick={this.createNewSpace}>Create new space</button>
        <h1>Reservations:</h1>
        <ParkingReservations reservations={this.state.reservations}></ParkingReservations>
      </div>
    );
  }
}
