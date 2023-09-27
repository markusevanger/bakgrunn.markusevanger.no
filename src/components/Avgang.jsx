function Avgang({name, arrival, linje, type}) {

    let timeDifference = new Date(arrival) - new Date(); 
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    let tid;

    if (minutes > 60) {
        tid = timeDifference;
    }

    else if (minutes <= 0){
        tid = "Nå";
    }
    else if (minutes == 1){
        tid = minutes + " minutt"
    }
    else {
        tid = minutes + " minutter";
    }



    let typefarge;
    if (type == "metro"){
        typefarge = {
            backgroundColor: '#ec700c'
        }
    }
    else if (type == "bus"){
        typefarge = {
            backgroundColor: '#e60000'
        }
    }
    else if (type == "tram"){
        typefarge = {
            backgroundColor: '#0973be'
        }
    }

    return (
      <>

        <div className="boks">
            <div className="linjeOgNavn">
                <div className="linjeDiv" style={typefarge}> 
                    <h1 className="linje">{linje.match(/\d+/)}</h1>
                </div>
                <h1 className="navn"> {name}</h1>
            </div>
            <h1 className="tid"> {tid}</h1>      
        </div>

      </>
    )
  }
  
  export default Avgang
