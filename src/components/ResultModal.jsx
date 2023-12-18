import {forwardRef, useImperativeHandle, useRef} from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ onReset, targetTime, remainingTime}, ref) {
    const dialog = useRef();
    
    const lost = remainingTime <= 0;
    const formattedTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 -remainingTime/(targetTime* 1000)) *100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog className="result-modal" ref={dialog} onClose={onReset}>
            {lost && <h2>You lost!</h2>}
            {!lost && <h2>Your score is {score}/100</h2>}
            <p>the target time was <strong>{targetTime}</strong></p>
            <p>You stopped the timer with <strong>{(formattedTime)} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})


export default ResultModal;