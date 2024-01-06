import React, { useEffect, useState } from 'react'
import { getAllCountries } from '../../services/CountryService';
import { Country, Passport } from '../../db';
import { useNavigate, useParams } from 'react-router';
import { getPassportById, updatePassportById } from '../../services/PassportService';
import { getEmployeeById } from '../../services/EmployeeService';

type Props = {}

const PassportEdit = (props: Props) => {
  const navigate = useNavigate();
  const {employeeId} = useParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [passport, setPassport] = useState<Passport>();

  useEffect(() => {
    const getCountries = async () => {
      const resultCountries = await getAllCountries();
      const resultEmployee = await getEmployeeById(employeeId!);
      setCountries(resultCountries.data.data);
      setPassport(resultEmployee?.data.data.passport!);
    };
    getCountries();
  }, []);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    let validCountries: Country[] = [];
    countries.forEach((country) => {
      if(country.id === (parseInt(data.get(country.countryName!) as string) as number))
      validCountries = [...validCountries, {id: country.id}];
    });

    const updatedPassport : Passport = {
      passportNumber: parseInt(data.get("passportNumber") as string) as number,
      validDate: data.get("validDate") as string,
      countries: validCountries
    }

    await updatePassportById(passport?.id?.toString()!, updatedPassport);
    navigate(`/employee/${employeeId}/passport`);
    
  }

  return (
    <div className='container ps-5 pe-5'>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="passportNumber" className="form-label">Passport Number</label>
          <input type="text" defaultValue={passport?.passportNumber} name='passportNumber' className="form-control" id="passportNumber" aria-describedby="passportNumber" />
        </div>

        <div className="mb-3">
          <label htmlFor="validDate" className="form-label">Valid Date</label>
          <input type="datetime-local" defaultValue={passport?.validDate} name='validDate' className="form-control" id="validDate" aria-describedby="validDate" />
        </div>

        <div>
          <label className="form-label">Valid Countries </label>
        </div>

        <div className="btn-group mb-3" role="group" aria-label="Basic checkbox toggle button group">
        {
            countries.map((country) => {
              return <React.Fragment key={country.id}>
              <input type="checkbox" defaultChecked={passport?.countries?.find((pc) => pc.id === country.id) && true} value={country.id} name={country.countryName} className="btn-check" id={country.countryName} autoComplete="off" />
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

export default PassportEdit