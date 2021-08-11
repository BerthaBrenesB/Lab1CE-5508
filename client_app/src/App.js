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
      reservations: [],
      reservationData_carId: 0,
      reservationData_owner: "", 
      reservationData_contact: "" 
    }
    this.createNewSpace = this.createNewSpace.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }



  async loadData() {
    const newRerservations = await this.parkingClient.getParkingReservationsData();
    const newSpaces = await this.parkingClient.getParkingSpacesData();
    // const spaceResult = await 
    // this.parkingClient.createParkingSpace();
    // const reservationResult = await 
    // this.parkingClient.createParkingReservation(123425, "Gustavo Segura", "8888-8888");



    this.setState({
      spaces: newSpaces,
      reservations: newRerservations
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    this.parkingClient.createParkingReservation(this.state.reservationData_carId, this.state.reservationData_owner, this.state.reservationData_contact).then(this.loadData());
    // this.parkingClient.createParkingReservation(this.state.reservationData_carId, "Gustavo Segura", "8888-8888").then(this.loadData());
    event.preventDefault();

  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  createNewSpace() {
    this.parkingClient.createParkingSpace().then(this.loadData());
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => { this.loadData() }}>Update data</button>
        <h1>Spaces:</h1>
        <ParkingSpaces spaces={this.state.spaces}></ParkingSpaces>
        <button onClick={this.createNewSpace}>Create new space</button>
        <h1>Reservations:</h1>
        <ParkingReservations reservations={this.state.reservations}></ParkingReservations>


        <h1>Create new reservation:</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Car id:
            <input type="text" name="reservationData_carId" value={this.state.reservationData_carId} onChange={this.handleInputChange} />
          </label>
          <label>
            Owner name:
            <input type="text" name="reservationData_owner" value={this.state.reservationData_owner} onChange={this.handleInputChange} />
          </label>
          <label>
            Contact number:
            <input type="text" name="reservationData_contact" value={this.state.reservationData_contact} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
