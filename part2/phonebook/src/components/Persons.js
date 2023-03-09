const Persons = (props) => (
	  <p key={props.id}>{props.name} {props.number} <button onClick={props.deletePerson}>delete</button></p>
  )
  
export default Persons