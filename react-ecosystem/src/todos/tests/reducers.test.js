import { expect } from "chai";
import { todosReducer } from "../reducers";

describe("The Todos Reducer", () => {
  it("Adds a new todo when CREATE_TODO action is received", () => {
    const fakeTodo = { text: "Hello", isCompleted: false };
    const fakeAction = {
      type: "CREATE_TODO",
      payload: {
        todo: fakeTodo,
      },
    };
    const originalState = { isLoading: false, data: [] };

    const expected = {
      isLoading: false,
      data: [fakeTodo],
    };

    const actual = todosReducer(originalState, fakeAction);
    expect(actual).to.deep.equal(expected);
  });
});
