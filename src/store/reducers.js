import proptype from "./proptype";

//初始化 store state 
const initalState={
  todolist:[]
}

// reducer 使用 es6  语法初始化为 initalState 
const reducers =(state = initalState , action)=>{
    switch(action.type){

      case proptype.reset :
          return initalState

      case proptype.updateState :
        return {
          ...state,
          ...action.payload
        }

      default : return state
    }
}

export default reducers