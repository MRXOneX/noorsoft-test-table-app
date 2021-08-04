import React from 'react'
import loader from '../assets/image/loader.gif'
const Loader = () => {
    return (
            <div style={{
                marginTop: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <img  width={100} src={loader} alt=""/>
            </div>
    )
}
export default Loader