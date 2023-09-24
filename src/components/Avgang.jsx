function Avgang({name, arrival, linje}) {

    let timeDifference = new Date(arrival) - new Date(); 
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

    console.log(name, minutes, " minutter igjen");
    let tid;

    if (minutes <= 0){
        tid = "nå";
    }
    else if (minutes == 1){
        tid = minutes + " minutt"
    }

    else {
        tid = minutes + " minutter";
    }

    return (
      <>

        <div className="boks">
            <div className="linjeOgNavn">
                <div className="linjeDiv"> 
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
