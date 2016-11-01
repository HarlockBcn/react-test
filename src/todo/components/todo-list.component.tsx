import React from 'react'
import TodoInput from './todo-input.component'
import TodoFooter from './todo-footer.component'
import TodoItem from './todo-item.component'
import TodoListBase from './todo-list-base.component'


export default class TodoList extends TodoListBase {

  renderToggleAll(completedCount) {
    const { todos, completeAll } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
    const { todos, filter } = this.props
    const activeCount = todos.length - completedCount

    return (
      <TodoFooter completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={this.handleClearCompleted.bind(this) }
        onShow={this.handleShow.bind(this) } />
    )

  }

  render() {
    const { todos, filter } = this.props

    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount) }
        <ul className="todo-list">
          {todos.map(todo =>
            <TodoItem key={todo.id} todo={todo}
              editTodo={this.props.editTodo} completeTodo={this.props.completeTodo} deleteTodo={this.props.deleteTodo}/>
          ) }
        </ul>
        {this.renderFooter(completedCount) }
      </section>
    )
  }
}
