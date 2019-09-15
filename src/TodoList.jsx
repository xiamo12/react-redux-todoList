import React, { Component } from "react";
import { Input, Button, List } from "antd";
import "antd/dist/antd.css"
import { connect } from "react-redux"
import { changeInputValue, addItem, deleteItem } from "./redux/actions"
const Item = List.Item

//TodoList是一个无状态的UI组件，因此写成function组件的形式，接收一个props参数
//无状态组件没有生命周期函数，不生成组件实例，因此性能比class生成的有状态组件更高。
function TodoList(props){
	const { inputValue, list, handleInputChange, handleClick, handleDelete } = props
	return (
		<div>
			<div>
				<Input 
					style = {{width: "20rem", margin: "1rem"}}
					value = { inputValue }
					onChange = {handleInputChange}
					autoFocus
					/>
				<Button 
					type="primary"
					onClick = {handleClick}
					>
					增加</Button>
			</div>
			<List 
				bordered 
				dataSource = { list } 
				style = {{width: "20rem", margin: "1rem"}}
				renderItem = {(item,index)=>{return <Item onClick={() => handleDelete(index)}>{item}</Item>}}></List>
		</div>
	)
}

//class生成有状态组件的写法如下。
//本例当中，产生的是UI组件。没有生命周期函数，数据处理在redux完成，因此也不需要在组件内部做数据处理。所以组件可以用上述function产生无状态组件，以提高性能。
// class TodoList extends Component{
// 	render(){
// 		const { inputValue, list, handleInputChange, handleClick, handleDelete } = this.props
// 		return (
// 			<div>
// 				<div>
// 					<Input 
// 						style = {{width: "20rem", margin: "1rem"}}
// 						value = { inputValue }
// 						onChange = {handleInputChange}
// 						autoFocus
// 						/>
// 					<Button 
// 						type="primary"
// 						onClick = {handleClick}
// 						>
// 						增加</Button>
// 				</div>
// 				<List 
// 					bordered 
// 					dataSource = { list } 
// 					style = {{width: "20rem", margin: "1rem"}}
// 					renderItem = {(item,index)=>{return <Item onClick={() => handleDelete(index)}>{item}</Item>}}></List>
// 			</div>
// 		)
// 	}
// }

const mapStateToProps = (state)=> { 
//接受的state是store里的数据，返回一个对象
//mapStateToProps作为connect()里的第一个参数
//mapDispatchToProps作为connect()里的第二个参数
	return {
		inputValue: state.inputValue, 
		list:state.list
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange(e){
			const action = changeInputValue(e)
			dispatch(action) 
		},
		handleClick(){
			const action = addItem();
			dispatch(action)
		},
		handleDelete(index){
			const action = deleteItem(index);
			dispatch(action)
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList) 
//connect是给组件TodoList与store做连接
//mapStateToProps 是数据连接规则，意思是把state映射给props
//mapDispatchToProps是事件绑定规则，意思是把store.dispatch方法挂载到props上