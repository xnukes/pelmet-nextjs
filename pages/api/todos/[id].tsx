import { NextApiRequest, NextApiResponse } from "next";
import todos from "../../../data/todos.json";
import path from "path";
import { promises as fs } from "fs";

export default (_: NextApiRequest, res: NextApiResponse) => {
    switch (_.method) {
        case 'GET':
            return getTodo(_, res);
        case 'PUT':
            return updateTodo(_, res);
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
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

function getTodo(_: NextApiRequest, res: NextApiResponse) {
    const { id } = _.query;
    const todo = todos.find((todo => todo.id === parseInt(id as string)));

    if (!todo) {
        res.status(404).json({ message: `Todo with id ${id} not found` });
        return;
    }

    res.status(200).json(todo);
}

function updateTodo(_: NextApiRequest, res: NextApiResponse) {
    const { id } = _.query;
    const todo = todos.find((todo => todo.id === parseInt(id as string)));

    if (!todo) {
        res.status(404).json({ message: `Todo with id ${id} not found` });
        return;
    }

    const { title, description, tags, dueDate, completed } = _.body;

    todo.title = title;
    todo.description = description;
    todo.tags = tags;
    todo.dueDate = dueDate;
    todo.completed = completed;

    saveDataJsonFile(JSON.stringify(todos)).then(() => {
        console.log("saved");
    });

    res.status(200).json(todo);
}
