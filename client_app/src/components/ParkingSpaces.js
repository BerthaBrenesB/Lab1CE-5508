import React from "react";

export class ParkingSpaces extends React.Component {
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
                </tr>)
            }
        </table>);
    }
}