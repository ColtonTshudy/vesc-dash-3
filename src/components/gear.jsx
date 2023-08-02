import { useEffect, useState, useRef } from 'react'
import './css/gear.css'

const on_bg = 'white'
const off_bg = 'transparent'
const on_fg = 'black'
const off_fg = 'white'

const Efficiency = ({ className, duty }) => {
    const [height, setHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        setHeight(ref.current.clientHeight)
    }, []);

    return (
        <div className={className} id="gear-main" ref={ref} style={{
            fontSize: `${height * .7}px`
        }}>
            <div className='gear-item' style={{
                backgroundColor: `${duty > 0 ? on_bg : off_bg}`,
                color: `${duty > 0 ? on_fg : off_fg}`
            }}>
                D
            </div>
            <div className='gear-item' style={{
                backgroundColor: `${duty === 0 ? on_bg : off_bg}`,
                color: `${duty === 0 ? on_fg : off_fg}`
            }}>
                N
            </div>
            <div className='gear-item'style={{
                backgroundColor: `${duty < 0 ? on_bg : off_bg}`,
                color: `${duty < 0 ? on_fg : off_fg}`
            }}>
                R
            </div>
        </div >
    );
}


export default Efficiency