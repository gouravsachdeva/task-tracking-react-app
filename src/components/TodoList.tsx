import React from "react";
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { useStrictDroppable } from "../utils/useStrictDroppable";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const [enabled] = useStrictDroppable(false);
  return (
    <div className="container">
      {enabled && (
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}

      {enabled && (
        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              className={`todos remove ${
                snapshot.isDraggingOver ? "dragcomplete" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Tasks</span>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
};

export default TodoList;
