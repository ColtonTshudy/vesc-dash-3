import { useEffect, useState, useRef } from 'react'
import './css/efficiency.css'
import padZeros from './pad-zeros-func'

const Efficiency = ({ className, value }) => {
    const [height, setHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="eff-main" ref={ref} style={{
            fontSize: `${height}px`,
        }}>
            <div id="eff-value-box">
                <label id="eff-value">

                    {clamp(padZeros(0, value * 100), 0, 100)}%
                </label>
            </div>
            <div className="seperator" />
            <label id='eff-subtitle' style={{
                fontSize: `${height * .15}px`,
            }}>
                Efficiency
            </label>
        </div >
    );
}

const clamp = (num, min, max) => {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}


export default Efficiency