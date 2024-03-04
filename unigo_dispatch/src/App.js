import './App.css';
import { app, db } from './firebaseConfig';
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rideRequests"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <div style={{ flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <h1>UniGo Dispatch</h1>
          <h2>Current Ride Requests</h2>
          <ul>
            {
              data.map((request) => {
                return <div key={request.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'ButtonShadow', marginBottom: '10px' }}>
                  
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>userid</p>
                    <p>{request.id}</p>
                  </div>
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>pickup</p>
                    <p>{request.pickupLoc.latitude}, {request.pickupLoc.longitude}</p>
                  </div>
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>destination</p>
                    <p>{request.destinationLoc.latitude}, {request.destinationLoc.longitude}</p>
                  </div>
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>time of request</p>
                    <p>{request.time.toDate().toDateString()} {request.time.toDate().toLocaleTimeString()}</p>
                  </div>
                </div>

                // return <li key={request.id}> {request.pickupLoc.latitude}  {request.pickupLoc.longitude} to {request.destinationLoc.latitude}, {request.destinationLoc.longitude} </li>
              })
            }
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
