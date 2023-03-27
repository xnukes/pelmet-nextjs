import { useQuery } from "@tanstack/react-query";

export const postTodo = async (todo) =>
    await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo),
    }).then((res) => res.json());

export const putTodo = async (todo) =>
    await fetch('/api/todos/' + todo.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo),
    }).then((res) => res.json());


export function useTodos(page = 1)
{
    return useQuery({
        queryKey: [ 'todos', page ],
        queryFn: () => fetch('/api/todos?page=' + page)
            .then((res) => res.json()),
        keepPreviousData: true,
    })
}

export function useTodoById(id = 1)
{
    return useQuery({
        queryKey: [ 'todo', id ],
        queryFn: () => fetch('/api/todos/' + id)
            .then((res) => res.json()),
        keepPreviousData: true,
    })
}
