import { useEffect, useState, useRef } from 'react'
import './css/clock.css'

const Clock = ({ className }) => {
    const [date, setDate] = useState(new Date());
    const [height, setHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        setHeight( ref.current.clientHeight )

        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);

    return (
        <div className={className} id="clock-main" ref={ref}>
            <label style={{
                fontSize: `${height * 0.7}px`,
            }}>
                {date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </label>
        </div>
    )
};

export default Clock;