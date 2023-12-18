import {useState, useRef} from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if(remainingTime <=0){
        // resetta l'intervallo se il tempo è finito
        clearInterval(timer.current);
        
        // rende visibile ResultModal al termine dell'intervallo
        dialog.current.open();
    }
    
    function handleReset() {
        // reset remainingTime da ResultModal
        setRemainingTime(targetTime * 1000);
    }
    
    function handleStart(){
        // verifica ogni 10 ms e restituisce il tempo rimanente
        timer.current = setInterval(()=>{
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 10
            );
        }, 10);
    }

    function handleStop(){
        // rende visibile ResultModal cliccando il button 'Stop'
        dialog.current.open();

        clearInterval(timer.current);
    }


    return (
        <>
            <ResultModal ref={dialog} onReset={handleReset} targetTime={targetTime} result="lost" remainingTime={remainingTime}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{ targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        { timerIsActive ? 'Stop' : 'Start'} Challenge 
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : '' }>
                { timerIsActive ? 'Time is running...' : 'Timer inactive' }
                </p>
            </section>
        </>
        );
}