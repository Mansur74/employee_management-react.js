import React from 'react'
import { Country, Passport } from '../../../db'

interface Props {
  country: Country  
}

const CountryCard = ({country}: Props) => {
  return (
    <div className="col">
      <div className="card h-100">
          <img src={country.imgURL} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{country.countryName}</h5>
            <p className="card-text">{country.capitalCity}</p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">{country.population} million population</small>
          </div>
      </div>
    </div>
  )
}

export default CountryCard