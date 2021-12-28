<script>
	import Todos from './component/Todos.svelte';
	import Alert from './component/Alert.svelte';
	import {todos} from './stores';

	export let name;
</script>

<Alert />
<Todos bind:todos={$todos} {name} />