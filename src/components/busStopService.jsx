// busStopService.js

export const fetchBusStopData = async (settings) => {
  
    let query = `
      {
        stopPlace(id: "${settings.stopPlaceId}") {
          name
          estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
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
  
    const apiUrl = 'https://api.entur.io/journey-planner/v3/graphql';
  
    const headers = {
      'Content-Type': 'application/json',
      'ET-Client-Name': 'bakgrunn.markusevanger.no',
    };
  
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query}),
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };