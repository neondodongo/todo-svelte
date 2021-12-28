<script>
    import { createEventDispatcher, tick } from 'svelte';
    import { selectOnFocus, focusOnInit } from '../actions';

    export let todo;

    const dispatch = createEventDispatcher();

    let editing = false;           // track editing mode
    let name = todo.name;          // hold the name of the todo being edited
    let editButtonPressed = false; // track if the edit button has been pressed

    const update = (updatedTodo) => {
        todo = {...todo, ...updatedTodo}; // applies modifications to todo via spread syntax
        dispatch('update', todo);         // emit an update event
    };

    const onCancel = () => {
        name = todo.name; // restopres name to it's initial value
        editing = false;  // exit editing mode
    };

    const onEdit = async () => {
        editButtonPressed = true; // user pressed the edit button
        editing = true;           // enter editing mode
    }

    const focusEditButton = (node) => editButtonPressed && node.focus();

    const onSave = () => {
        update({name: name}); // updates todo name
        editing = false;      // exit editing mode
    };

    const onRemove = () => {
        dispatch('remove', todo); // emit remove event
    };

    const onToggle = () => {
        update({completed: !todo.completed}); // updates todo status
    };
</script>
  
  <div class="stack-small">
      {#if editing}
      <!-- markup for editing todo: label, input text, cancel and save button -->
      <form on:submit|preventDefault={onSave} class="stack-small" on:keydown={e => e.key === 'Escape' && onCancel()}>
        <div class="form-group">
          <label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
          <input use:selectOnFocus use:focusOnInit bind:value={name} type="text" id="todo-{todo.id}" autoComplete="off" class="todo-text" />
        </div>
        <div class="btn-group">
          <button class="btn todo-cancel" on:click={onCancel} type="button">
            Cancel<span class="visually-hidden">renaming {todo.name}</span>
            </button>
          <button class="btn btn__primary todo-edit" type="submit" disabled={!name}>
            Save<span class="visually-hidden">new name for {todo.name}</span>
          </button>
        </div>
      </form>
      {:else}
      <!-- markup for displaying todo: checkbox, label, edit and delete button -->
      <div class="c-cb">
        <input type="checkbox" id="todo-{todo.id}"
          on:click={onToggle}
          checked={todo.completed}
        />
        <label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
      </div>
      <div class="btn-group">
        <button type="button" class="btn" on:click={onEdit} use:focusEditButton>
          Edit <span class="visually-hidden">{todo.name}</span>
        </button>
        <button type="button" class="btn btn__danger" on:click={onRemove}>
          Delete <span class="visually-hidden">{todo.name}</span>
        </button>
      </div>
      {/if}
  </div>
  