import React, { useEffect, useState } from 'react';

const Tavle = ({ stopId }) => {
  const [busStopData, setBusStopData] = useState(null);

  useEffect(() => {
    // Define the GraphQL query as a template string
    const query = `
      {
        stopPlace(id: "NSR:StopPlace:6009") {
          name
          estimatedCalls(timeRange: 72100, numberOfDepartures: 3) {     
            realtime
            aimedArrivalTime
            aimedDepartureTime
            expectedArrivalTime
            expectedDepartureTime
            actualArrivalTime
            actualDepartureTime
            date
            forBoarding
            forAlighting
            destinationDisplay {
              frontText
            }
            quay {
              id
            }
            serviceJourney {
              journeyPattern {
                line {
                  id
                  name
                  transportMode
                }
              }
            }
          }
        }
      }
    `;

    const apiUrl = 'https://api.entur.io/journey-planner/v2/graphql';

    const headers = {
      'Content-Type': 'application/json',
      'ET-Client-Name': 'YourAppName', // Replace with your app name
    };

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables: { stopId } }), // Include the query and variables
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data and set it to the component state
        console.log(data)
        setBusStopData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [stopId]);

  if (!busStopData) {
    return <div>Loading...</div>;
  }

  // Check if busStopData.data.stopPlace is defined before accessing its properties
  if (!busStopData.data || !busStopData.data.stopPlace) {
    return <div>Data not available.</div>;
  }

  // You can create separate components to display different parts of the data
  return (
    <div>

      

      <h1>{busStopData.data.stopPlace.name}</h1>
      <h2>{Date(busStopData.data.stopPlace.estimatedCalls[0].aimedArrivalTime)}</h2>
      <h2>{busStopData.data.stopPlace.estimatedCalls[1].aimedArrivalTime}</h2>
      <h2>{busStopData.data.stopPlace.estimatedCalls[2].aimedArrivalTime}</h2>
      {/* Create and use components for displaying estimatedCalls data */}
    </div>
  );
};

export default Tavle;
