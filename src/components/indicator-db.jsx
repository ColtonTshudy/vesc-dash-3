import React from 'react'

const expected_ids = 5;

const DatabaseIndicator = ({ className,  connected }) => {
    let fillColor = 'rgb(255,255,255,0.05)'
    let notif = ""

    // console.log(recv_ids.length)

    if (!connected) {
        fillColor = 'orange'
    }

    return (
        <div className={className}>
            <svg width="100%" height="100%" viewBox="0 0 24 24" stroke={fillColor} strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 18V6" />
                <path d="M20 12L20 18" />
                <path d="M12 10C16.4183 10 20 8.20914 20 6C20 3.79086 16.4183 2 12 2C7.58172 2 4 3.79086 4 6C4 8.20914 7.58172 10 12 10Z" />
                <path d="M20 12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12" />
                <path d="M20 18C20 20.2091 16.4183 22 12 22C7.58172 22 4 20.2091 4 18" />
            </svg>
        </div>
    );
}

export default DatabaseIndicator