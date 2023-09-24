import React, { useEffect, useState } from 'react';
import Avgang from './Avgang';

const Tavle = ({ stopId }) => {
  const [busStopData, setBusStopData] = useState(null);

  const fetchData = () => {
    // Define the GraphQL query as a template string
    const query = `
      {
        stopPlace(id: "NSR:StopPlace:6009") {
          name
          estimatedCalls(timeRange: 72100, numberOfDepartures: 4) {     
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
        console.log(data);
        setBusStopData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Initial data fetch when the component mounts
    fetchData();

    // Set up an interval to fetch data every 16 seconds
    const intervalId = setInterval(fetchData, 16000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
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
      
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM7.5 8C7.22386 8 7 8.22386 7 8.5V9.5C7 9.77614 7.22386 10 7.5 10H11V17.5C11 17.7761 11.2239 18 11.5 18H12.5C12.7761 18 13 17.7761 13 17.5V10H16.5C16.7761 10 17 9.77614 17 9.5V8.5C17 8.22386 16.7761 8 16.5 8H7.5Z" fill="white"></path>
      <h1 className='stoppeplass'>{busStopData.data.stopPlace.name}</h1>
      {busStopData.data.stopPlace.estimatedCalls.map((avgang, index) => (
        <Avgang name={avgang.destinationDisplay.frontText} arrival={avgang.expectedArrivalTime} linje={avgang.serviceJourney.journeyPattern.line.id} />
      ))}
    </div>
  );
};

export default Tavle;
