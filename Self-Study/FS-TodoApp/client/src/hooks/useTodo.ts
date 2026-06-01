const BASE_URL = "http://localhost:3000/api";
export const useTodo = ()=>{

    const fetchTodos = async () => {
        const response = await fetch(`${BASE_URL}/todos`);
        const data = await response.json();
        return data;
    }

    const postTodo = async (todo: ITodo) => {
        const response = await fetch(`${BASE_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        const data = await response.json();
        return data;
    }

    const putTodo = async (todo: ITodo) => {
        const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        const data = await response.json();
        return data;
    }

    const delTodo = async (id: string) => {
        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }

    return { fetchTodos, postTodo, putTodo, delTodo }
}