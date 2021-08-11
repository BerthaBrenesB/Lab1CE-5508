import React from "react";

export class ParkingReservations extends React.Component {
    render() {
        if (!this.props.reservations) {
            return <></>;
        }
        return (<table>
            <tr>
                <td><b>Space id   </b></td>
                <td><b>Car id     </b></td>
                <td><b>Owner name </b></td>
            </tr>
            {this.props.reservations.map(e =>

                <tr>
                    <td>{e.space}</td>
                    <td>{e.carId}</td>
                    <td>{e.OwnerName}</td>
                </tr>)
            }
        </table>);
    }
}