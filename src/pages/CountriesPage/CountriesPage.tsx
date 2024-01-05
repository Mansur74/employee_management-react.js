import React, { useEffect, useState } from 'react'
import { Country } from '../../db'
import { getAllCountries } from '../../services/CountryService';

type Props = {}

const CountriesPage = (props: Props) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    const getCountries = async () => {
      const result = await getAllCountries();
      typeof result !== "string" ? setCountries(result.data.data) : setServerError(result);
    }
    getCountries()
  }, []);

  return (
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Id</th>
            <th scope="col">Country Name</th>
            <th scope="col">Capital City</th>
            <th scope="col">Population</th>
            <th scope="col">Image URL</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            countries.map((country) =>
              <tr key={country.id}>
                <td><img height="100px" width="175px" src={country.imgURL}></img></td>
                <td><input type='text' disabled defaultValue={country.id}/></td>
                <td><input type='text' disabled defaultValue={country.countryName}/></td>
                <td><input type='text' disabled defaultValue={country.capitalCity}/></td>
                <td><input type='text' disabled defaultValue={country.population}/></td>
                <td><input type='text' disabled defaultValue={country.imgURL}/></td>
                <td><input type="button" value="Edit" className="btn btn-outline-secondary"/></td>
                <td><input type="button" value="Save" className="btn btn-outline-success"/></td>
                <td><input type="button" value="Delete" className="btn btn-outline-danger"/></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default CountriesPage