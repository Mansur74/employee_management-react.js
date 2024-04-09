import React from 'react'
import './CardSpinner.css'

type Props = {}

const CardSpinner = (props: Props) => {
  return (

    <div className="spinner-border text-primary" role="status" style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }}>
      <span className="visually-hidden">Loading...</span>
    </div>


  )
}

export default CardSpinner