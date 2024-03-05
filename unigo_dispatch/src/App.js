import './App.css';
import { db } from './firebaseConfig';
import { collection, onSnapshot, query, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rideRequests"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: "Unknown",
        ...doc.data()
      }));
      data.sort((a, b) => new Date(a.time.toDate()) - new Date(b.time.toDate()));
      setData(data);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    data.forEach(async (request) => {
      const snap = await getDoc(doc(db, "users", request.user));
      if (snap.exists()) {
        console.log(snap.data().name);
        request.name = snap.data().name;
      } else {
        console.log("No such document!");
        request.name = "Unknown";
      }
    }
    )
  }, [data]);


  // eslint-disable-next-line
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  return (
    <div className="App">
      <div style={{ flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <h1>UniGo Dispatch</h1>
          <h2>Current Ride Requests</h2>
          <ul>
            {
              data.map((request, key) => {
                return <div key={request.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'ButtonShadow', marginBottom: '10px' }}>
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>riderPriority</p>
                    <p>{key}</p>
                  </div>
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>userid</p>
                    <p>{request.name}</p>
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
                  <div style={{ flexDirection: 'column', padding: '10px' }}>
                    <p>time waiting</p>
                    <p>{timeSince(new Date(request.time.toDate()))}</p>
                  </div>
                </div>
              })
            }
          </ul>
        </div>
      </div>

    </div>
  );
}

export default App;
