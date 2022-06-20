import Capital from "./Capital"

const Countrieslist = ({countries, onClick}) => {
    const countrylist = countries
    
     if (countrylist.length > 10) {
        return(
            <div>
                Too many matches, specify another filter.
            </div>
        )
     } else if ( countrylist.length > 1 && countrylist.length < 11 ) {
        return (
            <div>
                {countrylist.map(country => 
                <p key={country.name.common}>
                    {country.name.common} 
                    <button value={country.name.common} onClick={onClick}>
                        Show
                    </button>
                </p>
                )}
                
            </div>
        )
    } else if (countrylist.length === 1) {

    const firstcountry = countrylist[0] 

        return (
            <div>
                <h1>{firstcountry.name.common}</h1>
                Capital: {firstcountry.capital}
                <br/>
                Total area: {firstcountry.area}
                <br/>
                <h3>Languages</h3>
                <ul>
                    {Object.values(firstcountry.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={firstcountry.flags.png} alt={`Flag of ${firstcountry}`} />
                <br/>
                Current weather:
                <Capital country={firstcountry} />
            </div>
        ) 
    } else  return(
        <div>
            Countries not found with this filter.
        </div>
    )
}
export default Countrieslist