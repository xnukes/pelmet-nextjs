import { Layout } from "../../../components";
import { NextPage } from "next";
import TodosEditForm from "../../../forms/todos";
import { ApiTodoType } from "../../../types/api";

const TodosCreatePage: NextPage = () => {

    const data: ApiTodoType = {
        id: 0,
        title: '',
        description: '',
        tags: [],
        dueDate: '',
        completed: false
    };

    return (
        <Layout title="Nový úkol">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {data && <TodosEditForm initialValues={data} />}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default TodosCreatePage;
