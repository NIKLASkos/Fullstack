const Persons = ({people, onClick}) => {
    console.log('people',people)
    return(
    <div>
        {people.map((person) => 
        <p key={person.name}>{person.name}, {person.number}  
        <button value={person.id} data-value={person.name} onClick={onClick}>Delete</button>
        </p>
        )}
    </div>
)}

export default Persons