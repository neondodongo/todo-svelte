<script>
    export let todos;

    $: totalTodos = todos.length;
    $: completedTodos = todos.filter(todo => todo.completed).length;

    let headingElement;

    export const focus = () => headingElement.focus();
</script>

<h2 id="list-heading" bind:this={headingElement} tabindex="-1">{completedTodos} out of {totalTodos} items completed</h2>

