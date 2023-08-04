import { useEffect, useState, useRef } from 'react'
import './css/bottom-display.css'
import padZeros from './pad-zeros-func'

const BottomDisplay = ({ className, odo, range }) => {
    const [height, setHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="bd-main" style={{
            fontSize: `${height}px`
        }}>
            <div id="bd-screen" ref={ref}>
                <div className="bd-row bd-grid-bg">
                    <label>{padZeros(0, range)} MILES</label>
                </div>
                <div className="bd-row bd-grid-bg">
                    <label>TO EMPTY</label>
                </div>
                <div className="bd-row bd-grid-bg" id="bd-odometer">
                    <label>{padZeros(2, odo)}</label>
                </div>
            </div>
        </div>
    );
}

export default BottomDisplay