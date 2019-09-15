## react-redux的使用

react-redux是一个第三方模块，可以帮助我们更方便地使用redux。

- ### 安装redux、react-redux

  ```
  $ sudo cnpm install redux -S
  $ sudo cnpm install react-redux -S
  ```

- 在项目入口文件index.js里引入react-redux，并使用react-redux提供的容器组件Provider，将state通过store属性分发给所有被connect起来的组件

  ```javascript
  //index.js
  import { Provider } from "react-redux"
  import "./redux/store"
  import TodoList from "./TodoList"
  const App = (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
  ReactDOM.render(App, document.getElementById('root'));
  ```

  - Provider是react-redux提供的一个普通的组件，可以作为顶层app容器的分发点，它只需要接收store一个属性，它会将state分发给所有被connect起来的组件，不管它在哪里，被嵌套了多少层。
  - ReactDOM.render()方法里接收的不再是<TodoList />组件，而是`App`

- ### 在组件里用connect接收store分发下来的state

  ```javascript
  import { connect } from "react-redux"
  class TodoList extends Component{
    //···省略
    <input value={this.props.inputValue}>
    //···省略
  }
  const mapStateToProps = (state) => {
    return {}
  }
  const mapDispatchToProps = (dispatch) => {
    return {}
  }
  export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
  ```

  - #### connect()()方法

    - 语法：connect( mapStateToProps, mapDispatchToProps )( TodoList )；
    - 先接收两个参数：数据绑定mapStateToProps和事件绑定mapDispatchToProps；
    - 再接收一个参数：要接收数据的组件。connect是给组件与store做连接的方法。接收组件之后，再给组件做以上所述的数据绑定和事件绑定。

  - #### mapStateToProps：

    - 接受store里的state，返回一个对象；
    - 构建好redux系统的时候，会被自动初始化；
    - 是数据连接规则，意思是把state映射给props；
    - react组件并不知道它的存在。因此需要分拣出组件所需要的redux状态。所以mapStateToProps需要绑定一个函数，函数接收state，返回一个对象，对象包含组件需要的值。

  - #### mapDispatchToProps：

    - 接收dispatch作为参数，进行事件绑定，返回一个对象；
    - 组件当中需要执行的事件都在mapDispatchToProps里注册完成；
    - mapDispatchToProps意为把store.dispatch方法挂载到props上。

