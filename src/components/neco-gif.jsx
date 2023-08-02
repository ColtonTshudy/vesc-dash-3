import { useEffect, useState } from 'react'

import Image00 from '../images/neco/frame_00_delay-0.1s.png'
import Image01 from '../images/neco/frame_01_delay-0.1s.png'
import Image02 from '../images/neco/frame_02_delay-0.1s.png'
import Image03 from '../images/neco/frame_03_delay-0.1s.png'
import Image04 from '../images/neco/frame_04_delay-0.1s.png'
import Image05 from '../images/neco/frame_05_delay-0.1s.png'
import Image06 from '../images/neco/frame_06_delay-0.1s.png'
import Image07 from '../images/neco/frame_07_delay-0.1s.png'
import Image08 from '../images/neco/frame_08_delay-0.1s.png'
import Image09 from '../images/neco/frame_09_delay-0.1s.png'
import Image10 from '../images/neco/frame_10_delay-0.1s.png'
import Image11 from '../images/neco/frame_11_delay-0.1s.png'
import Image12 from '../images/neco/frame_12_delay-0.1s.png'
import Image13 from '../images/neco/frame_13_delay-0.1s.png'
import Image14 from '../images/neco/frame_14_delay-0.1s.png'
import Image15 from '../images/neco/frame_15_delay-0.1s.png'
import Image16 from '../images/neco/frame_16_delay-0.1s.png'
import Image17 from '../images/neco/frame_17_delay-0.1s.png'
import Image18 from '../images/neco/frame_18_delay-0.1s.png'
import Image19 from '../images/neco/frame_19_delay-0.1s.png'
import Image20 from '../images/neco/frame_20_delay-0.1s.png'
import Image21 from '../images/neco/frame_21_delay-0.1s.png'

const images = [
    Image00,
    Image01,
    Image02,
    Image03,
    Image04,
    Image05,
    Image06,
    Image07,
    Image08,
    Image09,
    Image10,
    Image11,
    Image12,
    Image13,
    Image14,
    Image15,
    Image16,
    Image17,
    Image18,
    Image19,
    Image20,
    Image21
]

let timeoutID

const NecoGif = ({ className, speed, max }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        console.log('gif')
        timeoutID = setTimeout(() => {
            if (index >= images.length - 1)
                setIndex(0)
            else
                setIndex((old) => old + 1)
            console.log(index)
        }, 200*(1.04-(Math.log10(Math.abs(speed+0.00001)/max)+1))
        )
    }, [index])

    return (
        <div className={className}>
            <img src={images[index]} />
        </div>
    )
}

export default NecoGif