import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/activities/fetch?count=15')
    .then(response => setActivities(response.data))
    .catch(error => console.error(error));
  }, []);

  const downloadJSON = () => {
    const json = new Blob([JSON.stringify(activities, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(json);
    const a = document.createElement('a')
    a.href = url;
    a.download = 'activities.json'
    a.click();
  };

  const downloadCSV = () => {
    const headers = ['Activity', 'Type', 'Participants', 'Availability', 'Price', 'Duration', 'Kid-Friendly'];
    const rows = activities.map(activity => [
      activity.activity,
      activity.type,
      activity.participants,
      activity.availability,
      activity.price,
      activity.duration,
      activity.kidFriendly ? 'Yes' : 'No'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n')
      const csv = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(csv);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'activities.csv';
      a.click();
  }

  const printToConsole = () => {
    console.log(activities);
  };

  return (
    <div className="App">
      <h1>Activities</h1>

      <div className="buttons">
        <button onClick={downloadJSON}>Download JSON</button>
        <button onClick={downloadCSV}>Download CSV</button>
        <button onClick={printToConsole}>Print to Console</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Type</th>
            <th>Participants</th>
            <th>Availability</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Kid-Friendly?</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td className='activity-name'>{activity.activity}</td>
              <td>{activity.type}</td>
              <td>{activity.participants}</td>
              <td>{activity.availability}</td>
              <td>{activity.price}</td>
              <td>{activity.duration}</td>
              <td>{`${activity.kidFriendly ? 'Yes':'No'}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
