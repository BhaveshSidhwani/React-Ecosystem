import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import {
  loadTodos,
  removeTodoRequest,
  markTodoCompletedRequest,
} from "./thunks";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onMarkCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessge = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo) => (
        <TodoListItem
          key={todo.text}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletedPressed={onMarkCompletedPressed}
        />
      ))}

      <h3>Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          key={todo.text}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletedPressed={onMarkCompletedPressed}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessge : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onMarkCompletedPressed: (id) => dispatch(markTodoCompletedRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
