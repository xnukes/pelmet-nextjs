import { NextApiRequest, NextApiResponse } from "next";

import todos from "../../data/todos.json";
import { ApiTodoType } from "../../types/api";
import path from "path";
import { promises as fs } from "fs";

export default (_: NextApiRequest, res: NextApiResponse) => {
    switch (_.method) {
        case 'GET':
            return getTodos(_, res);
        case 'POST':
            return createTodo(_, res);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${_.method} Not Allowed`);
    }
}

async function readDataJsonFile() {
    const dataDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(dataDirectory + "/todos.json", "utf8");
}

async function saveDataJsonFile(data: any) {
    const dataDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.writeFile(dataDirectory + "/todos.json", data, "utf8");
}

function getTodos(_: NextApiRequest, res: NextApiResponse) {
    const { page, perPage } = _.query;
    const _Page = parseInt(_.query.page as string) || 1
    const _PerPage = parseInt(_.query.perPage as string) || 3;

    res.setHeader('X-Total-Count', todos.length);
    res.setHeader('X-Per-Page', _PerPage);
    res.setHeader('X-Current-Page', _Page);
    res.setHeader('X-Total-Pages', Math.ceil(todos.length / _PerPage));
    res.setHeader('X-Next-Page', _Page + 1);
    res.setHeader('X-Prev-Page', _Page - 1);

    res.status(200).json(todos.slice((_Page * _PerPage) - _PerPage, _Page * _PerPage));
}

function createTodo(_: NextApiRequest, res: NextApiResponse) {
    const { title, description, tags, dueDate, completed } = _.body;

    const newTodo: ApiTodoType = {
        id: todos.length + 1,
        title: title,
        description: description,
        tags: tags,
        dueDate: dueDate,
        completed: completed
    };

    todos.push(newTodo);

    saveDataJsonFile(JSON.stringify(todos)).then(() => {
        console.log("saved");
    });

    res.status(201).json(newTodo);
}
