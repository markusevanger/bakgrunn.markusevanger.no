import React, { useEffect, useState } from 'react';
import Avgang from './Avgang';
import { fetchBusStopData } from './busStopService';
import { useSettings } from './SettingsContext';


const Tavle = () => {
  const [busStopData, setBusStopData] = useState(null);
  const { settings } = useSettings();

  async function fetchData() {
    try {
      const data = await fetchBusStopData(settings); // Replace 'settings' with your appropriate settings
      setBusStopData(data);
      console.log("hentet ny data")
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  }

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Fetch data every 16 seconds
    const intervalId = setInterval(() => {
      fetchData();
    }, 16000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [settings]); // Fetch data on mount and run interval



  // Tavle komponent.
  return (
    <div className='heleTavle'>
      <div className='headerDiv'>
        <svg className='tbaneIkon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <g fill="white">
            <path className="cls-1" d="m50,0C22.39,0,0,22.39,0,50s22.39,50,50,50,50-22.39,50-50S77.61,0,50,0Zm23.14,35.41c0,1.93-1.57,3.5-3.49,3.5h-13.2v37.93c0,1.93-1.57,3.5-3.5,3.5h-5.91c-1.92,0-3.49-1.57-3.49-3.5v-37.93h-13.2c-1.93,0-3.5-1.57-3.5-3.5v-5.91c0-1.93,1.57-3.5,3.5-3.5h39.3c1.92,0,3.49,1.57,3.49,3.5v5.91Z"/>
          </g>
        </svg>
        <h1 className='stoppeplass'>{busStopData?.data?.stopPlace?.name}</h1>
      </div>
      {busStopData?.data?.stopPlace?.estimatedCalls.slice(0, settings.numberOfDepartures).map((avgang, index) => (
        <Avgang name={avgang.destinationDisplay.frontText} arrival={avgang.expectedArrivalTime} linje={avgang.serviceJourney.journeyPattern.line.id} type={avgang.serviceJourney.journeyPattern.line.transportMode} key={index} />
      ))}
    </div>
  );
};

export default Tavle;
