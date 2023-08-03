import { useEffect, useState, useRef } from 'react'
import './css/bottom-display.css'

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
                    <label>{padZeros(0, range)} Miles</label>
                </div>
                <div className="bd-row bd-grid-bg">
                    <label>Remaining</label>
                </div>
                <div className="bd-row bd-grid-bg" id="bd-odometer">
                    <label>{padZeros(2, odo)}</label>
                </div>
            </div>
        </div>
    );
}

//create a string from a number with a set amount of decimal places
const padZeros = (decimals, value) => {
    if (isNaN(value))
        return '0';

    const decimal_mp = Math.pow(10, decimals);
    value = Math.round(value * decimal_mp) / decimal_mp

    if (decimals === 0)
        return String(value)

    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}

export default BottomDisplay