const Success = ({ message }) => {

    const style = {
        color: 'green',
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
      <div style ={style} className="success">
        {message}
      </div>
    )
  }
  export default Success