import React, { useEffect, useState } from 'react'
import { Country } from '../../db'
import { getAllCountries } from '../../services/CountryService';
import { getAccessToken, getRefreshToken } from '../../services/AuthorizationService';
import { useNavigate } from 'react-router';

type Props = {}

const CountriesPage = (props: Props) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Country[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!getRefreshToken())
      navigate(`/sign-in`)
    else {
      getCountries();
    }
  }, []);
  
  const getCountries = async () => {
    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const result = await getAllCountries(accessToken);
    typeof result !== "string" ? setCountries(result.data.data) : setServerError(result);
  }

  const updateCountry = async () => {
    updateCountry();
  }

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
                <td><input type='text' disabled={isDisabled} defaultValue={country.countryName}/></td>
                <td><input type='text' disabled={isDisabled} defaultValue={country.capitalCity}/></td>
                <td><input type='text' disabled={isDisabled} defaultValue={country.population}/></td>
                <td><input type='text' disabled={isDisabled} defaultValue={country.imgURL}/></td>
                <td><input type="button" onClick={() => setIsDisabled(false)} value="Edit" className="btn btn-outline-secondary"/></td>
                <td><input type="button" onClick={() => setIsDisabled(true)} value="Save" className="btn btn-outline-success"/></td>
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