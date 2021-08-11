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

    async createParkingReservation(carId, ownerName, contact) {
        const rawResponse = await fetch("http://127.0.0.1:5000/reservations", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({carId:carId, OwnerName:ownerName, contact:contact})
        });
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }

    async createParkingSpace() {
        const rawResponse = await fetch("http://127.0.0.1:5000/spaces", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }
    async deleteParkingSpace(spaceId) {
        const rawResponse = await fetch("http://127.0.0.1:5000/spaces/"+spaceId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }
    async deleteReservation(reservationId) {
        const rawResponse = await fetch("http://127.0.0.1:5000/reservations/"+reservationId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        const parsedResponse = await rawResponse.json();
        return parsedResponse;
    }

}