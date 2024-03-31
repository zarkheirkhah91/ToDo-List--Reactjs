import React, { useState, useEffect } from "react";
import "./index.css";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

interface item {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([]);
  const [todoItem, setTodoItem] = useState<string>("");
  const [todoEditing, setTodoEditing] = useState<string>("");
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    console.log(todoEditing,'todoEditing222');

    console.log("todosss55555",todos);

    let titleTodoEdit: any = todos.filter(e => e.id == todoEditing)
    setEditingText(titleTodoEdit[0]?.text)
     console.log(titleTodoEdit,'ttttttttttttttt')
  }, [todoEditing]);

  const addItemsToList = () => {
    const newTodo: item = {
      id: `${Date.now()}`,
      text: todoItem,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoItem("");
  };

  const handleCompleteItem = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  
  const handleDeleteItem = (id: string) => {
    const filteredTodo = todos.filter((todos) => todos.id !== id);
    setTodos(filteredTodo);
  };

  const editTodo = (id: string) => {
    const updatTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });

   

    console.log("todosss",todos);
    console.log(todos)
    setTodos(updatTodos);
    setTodoEditing("");
    setEditingText("");
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-yellow-500 min-h-screen">
      <header className="text-8xl text-white flex justify-center items-center p-12 z-50 font-body font-semibold">
        <h1 className="[text-shadow:4px_4px_8px_var(--tw-shadow-color)] shadow-gray-500">
          Todo List
        </h1>
      </header>
      <div className="flex justify-center items-center z-50">
        <input
          type="text"
          placeholder="Enter Your Task..."
          className="p-4 min-w-80 text-3xl border-solid border-2 border-white bg-white rounded-l-lg w-2/5"
          onChange={(e) => {
            setTodoItem(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && todoItem?.length >= 1) addItemsToList();
          }}
          value={todoItem}
        />
        <button
          className="p-3 font-semibold border-0 bg-white rounded-r-lg text-5xl text-red-500
           cursor-pointer transition-all duration-300 ease-in hover:bg-red-500 hover:text-white disable:bg-gray"
          disabled={!(todoItem?.length >= 1)}
          onClick={() => {
            addItemsToList();
          }}
        >
          Add
        </button>
      </div>
      <div className="flex justify-center items-center justify-center items-center w-screen">
        <ul itemType="string" className="min-w-96 list-none  ">
          {todos.map((todo) => (
            <div
              className="m-4 border-0 bg-white text-2xl text-black flex justify-end
                items-center transition-all duration-150 ease-in rounded-lg"
            >
              <li
                className="p-3 min-w-80	 justify-center items-center pl-2px text-4xl"
                key={todo.id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todoEditing == todo.id ? (
                  <input
                    type="text"
                    onChange={(event) => setEditingText(event.target.value)}
                    value={editingText}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </li>
              <button
                className="rounded-full bg-amber-400 flex text-white border-amber-400 p-4 cursor-pointer text-xl m-1"
                onClick={() => {
                  console.log(todo.id,'ccccccccccccccccccccc')
                  setTodoEditing(todo.id);
                }}
              >
                <span className="px-3">Edit</span>
                <FaEdit />
              </button>
              <button
                className="rounded-full bg-teal-600 text-white border-0 p-4 cursor-pointer text-xl m-1"
                onClick={() => editTodo(todo.id)}
              >
                Submite Edit
              </button>
              <div className=" rounded-full text-xl bg-green-500 text-white border-0 p-4 cursor-pointer m-1">
                <input
                  className="size-5 mr-1"
                  type="checkbox"
                  id="subscribeNews"
                  name="subscribe"
                  onClick={() => handleCompleteItem(todo.id)}
                />
                done
              </div>
              <button
                className="rounded-full bg-red-500 text-white border-y-2 border-red-500 p-4 cursor-pointer text-base m-1"
                onClick={() => {
                    handleDeleteItem(todo.id);
                }}
              >
                <FaTrash size={24} />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};