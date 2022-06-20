const Failure = ({ message }) => {

    const style = {
        color: 'red',
        background: 'lightgrey',
        fontStyle: 'italic',
        fontSize: 20,
        padding: 10,
        borderStyle: 'solid',
        borderRadius: 3
      }

    if (message === '') {
      return null
    }
  
    return (
      <div style ={style} className="failure">
        {message}
      </div>
    )
  }
  export default Failure