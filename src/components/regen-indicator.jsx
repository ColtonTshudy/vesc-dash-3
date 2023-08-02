import React from 'react'
import './css/indicator.css'

const RegenIndicator = ({ className, on }) => {
    let fillColor = 'rgb(255,255,255,0.1)'

    if (on)
        fillColor = 'rgb(0,255,0)'

    return (
        <div className={className}>
            <svg fill={fillColor} height='100%' width='100%' viewBox="0 0 512 512">
                <g>
                    <g>
                        <g>
                            <path d="M307.072,44.433V33.659c0-9.152-3.797-18.005-10.432-24.32c-6.677-6.357-15.829-9.557-25.088-9.323
                                C123.968,7.249,7.253,123.963,0.043,271.505c-0.469,9.28,2.944,18.432,9.301,25.109c6.293,6.635,15.168,10.453,24.32,10.453
                                h10.773c14.656,116.437,113.152,204.928,232.747,204.928C406.656,511.995,512,406.651,512,277.201
                                C512,157.563,423.509,59.089,307.072,44.433z M86.165,264.401h-42.88C53.419,146.299,146.304,53.414,264.405,43.259v42.944
                                c-5.867,0.597-11.669,1.472-17.365,2.581c-11.371,2.219-22.4,5.397-33.003,9.451c-2.795,1.067-5.483,2.347-8.235,3.541
                                c-2.475,1.067-5.013,2.048-7.445,3.221C137.344,134.502,93.547,194.022,86.165,264.401z M277.333,405.329
                                c-70.592,0-128-57.408-128-128s57.408-128,128-128s128,57.408,128,128S347.925,405.329,277.333,405.329z"/>
                            <path d="M277.333,191.995c-47.061,0-85.333,38.272-85.333,85.333s38.272,85.333,85.333,85.333s85.333-38.272,85.333-85.333
                                S324.395,191.995,277.333,191.995z M277.333,213.329c11.776,0,21.333,9.557,21.333,21.333s-9.557,21.333-21.333,21.333
                                S256,246.438,256,234.662S265.557,213.329,277.333,213.329z M234.667,298.662c-11.776,0-21.333-9.557-21.333-21.333
                                s9.557-21.333,21.333-21.333S256,265.553,256,277.329S246.443,298.662,234.667,298.662z M277.333,341.329
                                c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333s21.333,9.557,21.333,21.333S289.109,341.329,277.333,341.329z
                                M320,298.662c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333s21.333,9.557,21.333,21.333
                                S331.776,298.662,320,298.662z"/>
                        </g>
                    </g>
                </g>
            </svg>
        </div >
    );
}

export default RegenIndicator