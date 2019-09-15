import { CHANGE_INPUT_VALUE, ADD_ITEM, DELETE_ITEM } from "./actionTypes"

const defaultState = {
	inputValue: "",
	list: []
}

export default (state = defaultState, action) => {
	const newState = JSON.parse(JSON.stringify(state));
	switch(action.type){
		case CHANGE_INPUT_VALUE:
			newState.inputValue = action.value
			return newState;
		case ADD_ITEM:
			if (newState.inputValue) {
				newState.list.push(newState.inputValue);
				newState.inputValue = "";
				return newState;
			}else{
				alert("请输入")
			}
			break;
		case DELETE_ITEM:
			newState.list.splice(action.index, 1);
			return newState;

		default:
			return state	
		}
}