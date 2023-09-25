import React, { useEffect, useState } from 'react';
import { useSettings } from './SettingsContext';
import Avgang from './Avgang';



const Tavle = ({ stopId }) => {

  const { settings } = useSettings();

  const [busStopData, setBusStopData] = useState(null);

  const fetchData = () => {
    
    
    // GraphQL quiery string for å hente ruter data
    const query = `
      {
        stopPlace(id: "${settings.stopPlaceId}") {
          name
          estimatedCalls(timeRange: 72100, numberOfDepartures: ${settings.numberOfDepartures}) {     
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
      'ET-Client-Name': 'bakgrunn.markusevanger.no',
    };

    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables: { stopId } }),
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




  // Tavle komponent. 
  return (
    <div className='heleTavle'>
      <h1 className='stoppeplass'>{busStopData.data.stopPlace.name}</h1>
      {busStopData.data.stopPlace.estimatedCalls.map((avgang, index) => (
        <Avgang name={avgang.destinationDisplay.frontText} arrival={avgang.expectedArrivalTime} linje={avgang.serviceJourney.journeyPattern.line.id} type={avgang.serviceJourney.journeyPattern.line.transportMode} />
      ))}
    </div>
  );
};

export default Tavle;
