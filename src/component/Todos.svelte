<script>
    import FilterButton from './FilterButton.svelte';
    import Todo from './Todo.svelte';
    import MoreActions from './MoreActions.svelte';
    import NewTodo from './NewTodo.svelte';
    import TodosStatus from './TodosStatus.svelte';
    import {alert} from '../stores';

    export let name;
    export let todos;

    let filter = 'all';
    let newTodoName = '';
    let todosStatus; // reference to TodosStatus instance

    $: newTodoID = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1

    $: {
        if (filter === 'all') $alert = 'Browsing all todos';
        else if (filter === 'active') $alert = 'Browsing active todos';
        else if (filter === 'completed') $alert = 'Browsing completed todos';
    }

    const removeTodo = (todo) => {
        todos = todos.filter(t => t.id !== todo.id);
        todosStatus.focus(); // give focus to the status heading
        $alert = `Todo '${todo.name}' has been deleted!`;
    }

    const addTodo = (name) => {
        todos = [...todos, {id: newTodoID, name: name, completed: false}];
        $alert = `Todo '${name}' has been added!`;
    }

    const updateTodo = (todo) => {
        const i = todos.findIndex(t => t.id === todo.id);
        if (todos[i].name !== todo.name) $alert = `todo '${todos[i].name}' has been renamed to '${todo.name}'`;
        if (todos[i].completed !== todo.completed) $alert = `todo '${todos[i].name}'' marked as ${todo.completed ? 'completed' : 'active'}`;
        todos[i] = {...todos[i], ...todo};
    }

    const filterTodos = (filter, todos) => 
        filter === 'active' ? todos.filter(t => !t.completed) :
        filter === 'completed' ? todos.filter(t => t.completed) :
        todos;
    
    const checkAllTodos = (completed) => {
        todos = todos.map(t => ({...t, completed:completed}));
        $alert = `${completed ? 'Checked': 'Unchecked'} ${todos.length} todos`;
    };

    const removeCompletedTodos = () => {
        $alert = `Removed ${todos.filter(t => t.completed).length} todos`;
        todos = todos.filter(t => !t.completed);
    };
</script>

<h1>{name}'s Todo List</h1>

<img height="32" width="88" src="https://www.w3.org/WAI/wcag2A" alt="">

<!-- Todos.svelte -->
<div class="todoapp stack-large">

    <!-- NewTodo -->
    <NewTodo autofocus on:addTodo={e => addTodo(e.detail)} />
  
    <!-- Filter -->
    <FilterButton bind:filter={filter} />
  
    <!-- TodosStatus -->
    <TodosStatus bind:this={todosStatus} {todos} />

    <!-- Todos -->
    <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
        {#each filterTodos(filter, todos) as todo (todo.id)}
        <li class="todo">
            <Todo {todo} 
                on:remove={e => removeTodo(e.detail)}
                on:update={e => updateTodo(e.detail)} 
            />    
        </li>
        {:else}
          Nothing to see here! :)
        {/each}
    </ul>
  
    <hr />
  
    <!-- MoreActions -->
    <MoreActions {todos}
        on:checkAll={e => checkAllTodos(e.detail)}
        on:removeCompleted={removeCompletedTodos}
    />
  
</div>