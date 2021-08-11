import React from "react";
import { ParkingClient } from '../client/ParkingClient';

export class ParkingSpaces extends React.Component {
    parkingClient = new ParkingClient();

    render() {
        if (!this.props.spaces) {
            return <></>;
        }
        return (<table>
            <tr>
                <td><b>Space id</b></td>
                <td><b>Status</b> </td>
            </tr>
            {this.props.spaces.map(e =>
                <tr>
                    <td>{e.id}</td>
                    <td>{e.state}</td>
                    <td>  <button onClick={() => { this.parkingClient.deleteParkingSpace(e.id) }}> delete </button>  </td>
                </tr>)
            }
        </table>);
    }
}