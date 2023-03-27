export type ApiTodoType = {
    id: number;
    title: string;
    description: string;
    tags: Array<string>;
    dueDate: string;
    completed: boolean;
}

export type ApiTodosType = ApiTodoType[];
