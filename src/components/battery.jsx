import './css/battery.css';
import '../css/Fonts.css'

const Battery = ({ className, soc, voltage, width, height, charging }) => {
    // constants
    const fontHeight = Math.min(width * 0.15, height * 0.8);
    const borderRadius = Math.min(width, height) * 0.2;
    const nubWidth = Math.min(width*0.05, height * 0.2);

    //input conditioning
    const soc_per = isNaN(soc) ? 0 : 100 * soc;;
    const voltage_trunc = isNaN(voltage) ? 0 : padZeros(1, voltage)

    //colors
    let barColor = 'white';
    let iconColor = 'none';
    if (soc_per < 25) {
        barColor = 'rgb(255,0,0)';
    }
    if (charging) {
        barColor = 'rgb(0,255,0)';
        iconColor = 'white'
    }

    return (
        <div className={className} id="battery-main" style={{
            height: `${height}px`,
            width: `${width}px`,
        }}>
            <svg height={height} width={height} viewBox="0 0 24 24" fill={iconColor}>
                <g fillRule='evenodd'>
                    <path d="M11.5 13.8H10.1299C8.72143 13.8 8.01721 13.8 7.72228 13.3385C7.42735 12.8769 7.72321 12.2379 8.31493 10.9597L11.0463 5.06006C11.4205 4.25182 11.6075 3.8477 11.8038 3.89091C12 3.93413 12 4.37946 12 5.27013V9.7C12 9.9357 12 10.0536 12.0732 10.1268C12.1464 10.2 12.2643 10.2 12.5 10.2H13.8701C15.2786 10.2 15.9828 10.2 16.2777 10.6615C16.5726 11.1231 16.2768 11.7621 15.6851 13.0402L12.9537 18.9399C12.5795 19.7482 12.3925 20.1523 12.1962 20.1091C12 20.0659 12 19.6205 12 18.7299V14.3C12 14.0643 12 13.9464 11.9268 13.8732C11.8536 13.8 11.7357 13.8 11.5 13.8Z" />
                </g>
            </svg>

            <div id="battery-body" style={{
                borderRadius: `${borderRadius}px`,
                flex: `0 0 calc(100% - ${nubWidth}px - ${height}px)`,
            }}>
                <div id="battery-fill" style={{
                    background: `linear-gradient(to right, ${barColor} ${soc_per}%, transparent ${soc_per}%)`,
                    borderRadius: `${borderRadius * .5}px`,
                }}>
                    <label style={{
                        fontSize: `${fontHeight}px`,
                        lineHeight: `${height}px`,
                        backgroundImage: `linear-gradient(to right, rgb(0,0,0,.9) ${soc_per}%, white ${soc_per}%)`,
                    }}>
                        {voltage_trunc}V
                    </label>
                </div>
            </div>
            <div id="battery-spacer" />
            <div id="battery-nub" style={{
                flex: `0 0 ${nubWidth}px`,
                borderTopRightRadius: `${borderRadius * .5}px`,
                borderBottomRightRadius: `${borderRadius * .5}px`,
            }}></div>
        </div>
    )
};

const drawBattery = () => {

}

// Create a string from a number with a set amount of decimal places
const padZeros = (decimals, value) => {
    const decimal_mp = Math.pow(10, decimals);
    value = Math.round(value * decimal_mp) / decimal_mp

    if (decimals === 0)
        return String(value)

    const [front, rear] = String(value).split('.')
    let output = rear !== undefined ? front + '.' + rear : front + '.'
    return output.padEnd(front.length + 1 + decimals, '0')
}

export default Battery;