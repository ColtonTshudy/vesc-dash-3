import { useEffect, useState, useRef } from 'react'
import './css/gear.css'

const on_bg = 'var(--fg)'
const off_bg = 'transparent'
const on_fg = 'var(--bg)'
const off_fg = 'var(--fg)'

const power_deadband = 100; //Minimum watts before registering duty cycle

const Efficiency = ({ className, duty, power }) => {
    const [height, setHeight] = useState()
    const ref = useRef()
    const realDuty = Math.abs(power) - power_deadband > 0 ? duty : 0;

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="gear-main" ref={ref} style={{
            fontSize: `${height * .7}px`
        }}>
            <div className='gear-item' style={{
                backgroundColor: `${realDuty > 0 ? on_bg : off_bg}`,
                color: `${realDuty > 0 ? on_fg : off_fg}`
            }}>
                D
            </div>
            <div className='gear-item' style={{
                backgroundColor: `${realDuty === 0 ? on_bg : off_bg}`,
                color: `${realDuty === 0 ? on_fg : off_fg}`
            }}>
                N
            </div>
            <div className='gear-item' style={{
                backgroundColor: `${realDuty < 0 ? on_bg : off_bg}`,
                color: `${realDuty < 0 ? on_fg : off_fg}`
            }}>
                R
            </div>
        </div >
    );
}


export default Efficiency