export class ParkingClient {
    async getParkingSpacesData() {
        const rawResponse = await fetch("http://127.0.0.1:5000/spaces");
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }

    async getParkingReservationsData() {
        const rawResponse = await fetch("http://127.0.0.1:5000/reservations");
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }
}