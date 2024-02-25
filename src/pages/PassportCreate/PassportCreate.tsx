import React, { useEffect, useState } from 'react'
import { getAllCountries } from '../../services/CountryService';
import { Country, Passport } from '../../db';
import { createPassport } from '../../services/PassportService';
import { useNavigate, useParams } from 'react-router';
import { getAccessToken, getRefreshToken } from '../../services/AuthorizationService';
type Props = {}

const PassportCreate = (props: Props) => {
  const navigate = useNavigate();
  const {employeeId} = useParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (!getRefreshToken())
			navigate(`http://localhost:8080/api/authorization/sign-in`)
		else {
      getCountries();
    }
  }, []);

  const getCountries = async () => {
    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const result = await getAllCountries(accessToken);
     setCountries(result.data.data);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {    
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    let validCountries: Country[] = [];
    countries.forEach((country) => {
      if(country.id === (parseInt(data.get(country.countryName!) as string) as number))
      validCountries = [...validCountries, {id: country.id}];
    });

    const passport: Passport = {
      passportNumber: parseInt(data.get("passportNumber") as string) as number,
      validDate: data.get("validDate") as string,
      countries: validCountries
    }
    
    const refreshToken: string = getRefreshToken()!;
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    await createPassport(employeeId!, passport, accessToken);
    navigate(`/employee/${employeeId}/passport`);
  }

  return (
    !isCreate ? 
    <div className='container'>
      <p>Passport does not exist.</p>
      <input type="button" value="Create Passport" onClick={() => setIsCreate(true)} className="btn btn-secondary"/>
    </div> :
    <div className='container ps-5 pe-5'>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="passportNumber" className="form-label">Passport Number</label>
          <input type="text" name='passportNumber' className="form-control" id="passportNumber" aria-describedby="passportNumber" />
        </div>

        <div className="mb-3">
          <label htmlFor="validDate" className="form-label">Valid Date</label>
          <input type="datetime-local" name='validDate' className="form-control" id="validDate" aria-describedby="validDate" />
        </div>

        <div>
          <label className="form-label">Valid Countries </label>
        </div>

        <div className="btn-group mb-3" role="group" aria-label="Basic checkbox toggle button group">
          {
            countries.map((country) => {
              return <React.Fragment key={country.id}>
              <input type="checkbox" value={country.id} name={country.countryName} className="btn-check" id={country.countryName} autoComplete="off" />
              <label className="btn btn-outline-success" htmlFor={country.countryName}>{country.countryName}</label>
              </React.Fragment>;
            })
          }
        </div>

        <div>
          <button type="submit" className="btn btn-secondary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default PassportCreate