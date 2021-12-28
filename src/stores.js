import { writable } from "svelte/store";
import { localStore } from "./localStore";

export const alert = writable('Welcome to the To-Do list app!');
const initialTodos = [
    {id: 1, name:'Wrap Christmas gifts', completed: false},
    {id: 2, name:'See Christmas lights display', completed: false},
    {id: 3, name:'Make gingerbread house', completed: false}
];


export const todos = localStore('svelte-todo', initialTodos);