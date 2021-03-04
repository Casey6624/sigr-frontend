import * as signalR from "@microsoft/signalr";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [hubConnection, setHubConnection] = useState();

  useEffect(() => {
    const conn = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7071/api")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Starts the SignalR connection
    conn.start().then((a) => {
      // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
      if (conn.connectionId) {
        conn.invoke("negotiate", conn.connectionId, {
          customerId: "vch_customer_id",
          personId: "vch_person_id",
        });
      }
    });
    setHubConnection(conn);
  }, []);

  return (
    <div className="App">
      <h1>sigr</h1>
    </div>
  );
}

export default App;
