import React from 'react';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, doc, getDoc, deleteDoc, orderBy, where, limit, updateDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
var driverName = "driver1";

function NewScreen() {
    const [riderID, setRiderID] = useState(null);

    async function claimRider() {
        console.log("Getting rider");
        const q = query(collection(db, "rideRequests"), where("status", "==", "waiting"), orderBy("time", "asc"), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            console.log(doc.id, " => ", doc.data());
            if (doc.data().status === "waiting") {
                console.log("Rider found");
                setRiderID(doc.id);
                await updateDoc(doc.ref, {
                    status: "WaitingForDriver",
                    driver: driverName
                });
            }
        });
    }

    async function waitingForRider() {
        if (riderID === null) {
            console.log("No rider to wait for");
            return;
        }
        console.log("Waiting for rider");
        const docRef = doc(db, "rideRequests", riderID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            await updateDoc(docRef, {
                status: "DriverIsWaiting"
            });
        }
    }

    async function pickUpRider() {
        if (riderID === null) {
            console.log("No rider to pick up");
            return;
        }
        console.log("Picking up rider");
        const docRef = doc(db, "rideRequests", riderID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                status: "InTransit"
            });
        }
    }

    async function dropOffRider() {
        if (riderID === null) {
            console.log("No rider to drop off");
            return;
        }
        console.log("Dropping off rider");
        const docRef = doc(db, "rideRequests", riderID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await updateDoc(docRef, {
                status: "DroppedOff"
            });
        }
    }




    return (
        <>
            <p onClick={() => claimRider()}>click here to claim a new rider</p>
            <p onClick={() => waitingForRider()}>click here wait for rider</p>
            <p onClick={() => pickUpRider()}>click here to pick up rider</p>
            <p onClick={() => dropOffRider()}>click here to drop off rider</p>
        </>
    );
}

export default NewScreen;
