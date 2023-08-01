import { useEffect, useState } from 'react'
import './css/App.css'
import './css/Fonts.css'

import Socket from './CAN-subscriber.jsx'

import Battery from './components/battery.jsx'


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

    return (
        <div className="center-screen">
            <div className="viewport">

                <div id='info-box'>
                    <div id="battery-box">
                        <Battery soc={data.soc} voltage={data.battery_voltage} width={150} height={40} />
                    </div>
                    {/* <div id="temperature-box">
                        <IconBox value={data.mot_temp} units='°C' image={motorIcon} width={125} height={40} align='left' warn={config['warn_temp_mot']} />
                        <IconBox value={data.mos_temp} units='°C' image={mosfetIcon} width={125} height={40} align='right' warn={config['warn_temp_mos']} />
                    </div> */}
                </div>




            </div>
        </div>
    )
}

export default App