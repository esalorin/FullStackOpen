const PersonForm = (props) => (
	<form>
	  <div>
		name: <input value={props.name} onChange={props.changeName}/>
		</div>
		<div>number: <input value={props.number} onChange={props.changeNumber}/>
		</div>
		<div>
		  <button type="submit" onClick={props.onClick}>add</button>
		</div>
	</form>
  )

export default PersonForm