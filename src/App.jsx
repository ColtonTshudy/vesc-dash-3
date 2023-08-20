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
import Efficiency from './components/efficiency'
import Gear from './components/gear'
import RegenIndicator from './components/indicator-regen'
import SpeedReadout from './components/speed-readout'
import PowerReadout from './components/power-readout'
import BottomDisplay from './components/bottom-display'
import CanIndicator from './components/indicator-canbus'
import DatabaseIndicator from './components/indicator-db'

import Miku from './images/miku.png'
import Trees from './images/winter_trees_snow_night_landscape_96069_1920x1080.jpg'

const placeholder = 'XX'

function App() {
    const [data, setData] = useState({}) //Default data values
    const [config, setConfig] = useState({}) //Default config values
    const [socketConn, setSocketConn] = useState(false)
    const [dbConn, setDbConn] = useState(false)
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const socket = new Socket(5002)
        let socketTimeout = null

        socket.getSocket().on('connect', () => setSocketConn(true))

        socket.getSocket().on('data', (data) => {
            setData(data)

            clearTimeout(socketTimeout)

            socketTimeout = setTimeout(() => {
                setData({}) //reset data if socket doesn't transmit for 2 seconds
            }, 2000);
        })

        socket.getSocket().on('config', (config) => {
            const internal_config = {
                'capacity_ah': config['battery']['capacity_ah'],
                'max_speed': config['dash']['max_speed'],
                'max_rpm': config['motor']['max_rpm'],
                'max_amps_bat': config['battery']['max_amps'],
                'max_amps_mot': config['motor']['max_amps'],
                'warn_temp_mot': config['motor']['warn_temp'],
                'warn_temp_mos': config['controller']['warn_temp'],
                'max_power': config['controller']['max_power_kw'],
            }
            setConfig({ ...internal_config })
            console.log(config)
            console.log(internal_config)
        })

        socket.getSocket().on('disconnect', () => {
            setData({})
            setSocketConn(false)
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
        <div className="center-screen" onClick={() => {
            setDarkMode((prevState) => !prevState)
        }}
        style = {{
            "--fg": darkMode ? 'white' : 'black',
            "--bg": darkMode ? 'black' : 'white',
        }}>
            <div className="viewport">
                {/* <img id="main-background" src={Miku} /> */}
                {/* <img id="main-background" src={Trees} /> */}

                <div className='fullscreen-container'>
                    <div id='info-box'>

                        <div id="header-box">
                            <Clock className='clock' />
                            <Battery className='battery' soc={soc} voltage={data.battery_voltage} charging={power_in < 0} />
                        </div>

                        <div id="temperature-box">
                            <MosfetTemp value={data.mos_temp} width={125} height={40} warn={config['warn_temp_mot']} />
                            <MotorTemp value={data.mot_temp} width={125} height={40} warn={config['warn_temp_mos']} />
                        </div>

                        <div id="item-3">
                            <div className="alert-zone">
                                <CanIndicator className='indicator' recv_ids={data.ids} connected={socketConn} />
                                <DatabaseIndicator className='indicator' connected={dbConn} />
                            </div>
                            <Efficiency className={'efficiency'} value={efficiency} />
                            <div className="alert-zone">
                                <RegenIndicator className='indicator' on={power_in < 0} />
                            </div>
                        </div>

                        <div id="item-4">
                            <Gear className='gear' duty={data.duty_cycle} />
                        </div>

                        <BottomDisplay className='bottom-display' odo={data.odometer} range={placeholder} />

                    </div>
                </div>

                <div className='fullscreen-container'>
                    <Speedometer className='gauges' value={data.mph} min={0} max={config['max_speed']} darkMode={darkMode}/>
                    <PowerGauge className='gauges' value={power_in / 1000} min={0} max={config['max_power']} darkMode={darkMode}/>
                </div>

                <div className='fullscreen-container'>
                    <div id='readout-container'>
                        <SpeedReadout className="readout" velocity={data.mph} topSpeed={placeholder} avgSpeed={placeholder} />
                        <div className="readout-spacer" />
                        <PowerReadout className="readout" power={power_in / 1000} topPower={placeholder} avgPower={placeholder} />
                    </div>
                </div>
                {/* <Probe /> */}
            </div>
        </div>
    )
}

const Probe = () => {
    console.log('re-rendered')
}

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log(`${id}: ${actualDuration}`)
}

export default App