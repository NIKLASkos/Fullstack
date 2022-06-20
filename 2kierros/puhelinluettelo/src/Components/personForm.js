const PersonForm = ({nameValue, numberValue, onNameChange, onNumberChange, onSubmit}) => {
    return (
        <div>
        <form onSubmit={onSubmit}>
            <h3>Add a new person:</h3>
            name: <input value={nameValue} onChange={onNameChange}
            />
            <div>
            number:<input value={numberValue} onChange={onNumberChange}
            />
            </div>
            <div>
            <button type="submit">add</button>
            </div> 
        </form>  
        </div>
    )
}
export default PersonForm