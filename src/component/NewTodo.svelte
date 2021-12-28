<script>
    import {createEventDispatcher} from 'svelte';
    import {onMount} from 'svelte';
    import {selectOnFocus} from '../actions';

    const dispatch = createEventDispatcher();

    let name = '';
    let nameElement; // reference to the name input DOM node

    const addTodo = () => {
        dispatch('addTodo', name);
        name='';
        nameElement.focus(); // give focus to the name input
    };

    const onCancel = () => {
        name = '';
        nameElement.focus(); // give focus to the name input
    };

    export let autofocus = false;

    onMount(() => autofocus && nameElement.focus()) // if autofocus is true, run nameElement.focus()
</script>

<form on:submit|preventDefault={addTodo} on:keydown={e => e.key === 'Escape' && onCancel()}>
    <h2 class="label-wrapper">
      <label for="todo-0" class="label__lg">What needs to be done?</label>
    </h2>
    <input use:selectOnFocus bind:value={name} bind:this={nameElement} type="text" id="todo-0" autoComplete="off" class="input input__lg" />
    <button type="submit" disabled={!name} class="btn btn__primary btn__lg">Add</button>
</form>