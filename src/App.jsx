import { useEffect, useState } from 'react'
import './css/App.css'
import './css/Fonts.css'

import Socket from './CAN-subscriber'

import Battery from './components/battery'
import MotorTemp from './components/motor-temp'
import MosfetTemp from './components/mosfet-temp'
import Clock from './components/clock'
import Speedometer from './components/speedometer'
import PowerGauge from './components/power-gauge'
import NecoGif from './components/neco-gif'
import Efficiency from './components/efficiency'
import Gear from './components/gear'
import RegenIndicator from './components/regen-indicator'
import SpeedReadout from './components/speed-readout'
import PowerReadout from './components/power-readout'

import Miku from './images/miku.png'
import Trees from './images/winter_trees_snow_night_landscape_96069_1920x1080.jpg'

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
    const power_in = data.battery_voltage * data.battery_current
    const power_out = data.motor_voltage * data.motor_current;
    const efficiency = power_out / power_in

    return (
        <div className="center-screen">
            <div className="viewport">
                <img src={Trees} style={{ position: 'absolute', width: '100%', height: '100%', filter: 'brightness(1) blur(0px)' }} />

                <div className='fullscreen-container'>
                    <div id='info-box'>
                        <div id="header-box">
                            <Clock className='clock' />
                            <Battery soc={soc} voltage={data.battery_voltage} width={140} height={35} charging={power_in < 0} />
                        </div>
                        <div id="temperature-box">
                            <MosfetTemp value={data.mot_temp} width={125} height={40} warn={config['warn_temp_mot']} />
                            <MotorTemp value={data.mos_temp} width={125} height={40} warn={config['warn_temp_mos']} />
                        </div>
                        <div id="item-3">
                            <div className="alert-zone"> </div>
                            <Efficiency className={'efficiency'} value={efficiency} />
                            <div className="alert-zone">
                                <RegenIndicator className='regen-indicator' on={power_in < 0} />
                            </div>
                        </div>
                        <div id="item-4">
                            <Gear className='gear' duty={data.duty_cycle} />
                        </div>
                        {/* <NecoGif className='gif' speed={data.mph} max={config['max_speed']}/> */}
                    </div>
                </div>

                <div className='fullscreen-container'>
                    <Speedometer className='speedometer gauges' value={data.mph} min={0} max={config['max_speed']} ticks={6} size={500} />
                    <PowerGauge className='power-gauge gauges' value={power_in / 1000} min={0} max={10} ticks={6} size={500} />
                </div>

                <div className='fullscreen-container'>
                    <div id='readout-container'>
                        <div className="readout-box">
                            <SpeedReadout className="speed-readout" velocity={data.mph} topSpeed={50} avgSpeed={50} />
                        </div>
                        <div className="readout-box">
                            <PowerReadout className="power-readout" power={power_in} />
                        </div>
                    </div>
                </div>

            </div>
            {/* <Probe></Probe> */}
        </div>
    )
}

const Probe = () => {
    console.log('re-rendered')
}

export default App