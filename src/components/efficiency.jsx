import { useEffect, useState, useRef } from 'react'
import './css/efficiency.css'

const Efficiency = ({ className, value }) => {
    const [height, setHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="eff-main" ref={ref}>
            <div id="eff-value-box">
                <label id="eff-value" style={{  
                    fontSize: `${height * .65}px`,
                }}>

                    {clamp(padZeros(0, value * 100), 0, 100)}%
                </label>
            </div>
            <div id="eff-seperator" />
            <label id='eff-subtitle' style={{
                fontSize: `${height * .15}px`,
            }}>
                Eco
            </label>
        </div >
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

const clamp = (num, min, max) => {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}


export default Efficiency