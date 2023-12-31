import React from 'react'
import './css/mosfet-temp.css'
import padZeros from './pad-zeros-func'

const MosfetTemp = ({ className, value, height, width, warn }) => {
    var fillColor = 'grey'

    if (value >= warn)
        fillColor = 'orange'

    return (
        <div id="mostemp_main" className={className} style={{
            height: `${height}px`,
            width: `${width}px`,
        }}>
            <svg fill={fillColor} height={height} width={height} viewBox="0 0 81.92 122.88">
                <g fillRule='evenodd'>
                    <path d="M14.1,0H67.82l14.1,13.06V60.8a9,9,0,0,1-9,9H9a9,9,0,0,1-9-9V13.06L14.1,0ZM41,13.32a7.37,7.37,0,1,1-7.37,7.36A7.37,7.37,0,0,1,41,13.32ZM56.53,76.48h14.3v28.46h-2l-2,17.94h-6.2l-2-17.94h-2V76.48Zm-22.72,0h14.3v28.46h-2l-2,17.94h-6.2l-2-17.94h-2V76.48Zm-22.72,0h14.3v28.46H23.34l-2,17.94h-6.2l-2-17.94H11.09V76.48ZM19,8.13H63l10.82,10V33.24H8.13V18.15L19,8.13Z" />
                </g>
            </svg>

            <label style={{
                fontSize: `${height * 0.7}px`,
            }}>
                &nbsp;{padZeros(0, value)}°C
            </label>
        </div >
    );
}

export default MosfetTemp