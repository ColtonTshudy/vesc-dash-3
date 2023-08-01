import { useEffect, useState } from 'react'
import './css/App.css'
import './css/Fonts.css'

import Socket from './CAN-subscriber.jsx'

import Battery from './components/battery.jsx'
import MotorTemp from './components/motor-temp.jsx'
import MosfetTemp from './components/mosfet-temp.jsx'
import Clock from './components/clock.jsx'

function App() {
    const [data, setData] = useState({})
    const [config, setConfig] = useState({})

    useEffect(() => {
        const socket = new Socket(5002)

        socket.getSocket().on('data', (data) => {
            setData(data)
        })

        socket.getSocket().on('config', (config) => {
            setConfig({
                'capacity_ah': config['battery']['capacity_ah'],
                'max_speed': config['dash']['max_speed'],
                'max_rpm': config['motor']['max_rpm'],
                'max_amps_bat': config['battery']['max_amps'],
                'max_amps_mot': config['motor']['max_amps'],
                'warn_temp_mot': config['motor']['warn_temp'],
                'warn_temp_mos': config['controller']['warn_temp'],
            })
            console.log(config)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const soc = (config['capacity_ah'] - data.ah_consumed) / config['capacity_ah']

    return (
        <div className="center-screen">
            <div className="viewport">

                <div id='info-box-container'>
                    <div id='info-box'>
                        <div id="battery-box">
                            <Clock/>
                            <Battery soc={soc} voltage={data.battery_voltage} width={125} height={30} />
                        </div>
                        <div id="temperature-box">
                            <MosfetTemp value={data.mot_temp} width={125} height={40} warn={config['warn_temp_mot']} />
                            <MotorTemp value={data.mos_temp} width={125} height={40} warn={config['warn_temp_mos']} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default App