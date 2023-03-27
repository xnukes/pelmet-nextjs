import { Layout } from "../../components";
import { ApiTodosType } from "../../types/api";
import TodosTable from "../../tables/todos";
import { useRouter } from "next/router";

export default function TodosSSRPage(
    { todos: todos, page: page, totalPages: totalPages }:
        { todos: ApiTodosType, page: number, totalPages: number })
{
    const router = useRouter();

    return (
        <Layout title="Úkoly (Server side render)">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {!todos && <div>Načítám úkoly...</div>}
                        {todos && <TodosTable todos={todos} options={{
                            page: page,
                            totalPages: totalPages,
                            onPageChange: (newpage: number) => {
                                router.push(`/todos-ssr/?page=${newpage}`);
                            }
                        }} />}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ query: { page = 1 } }) {

    const res = await fetch(`http://localhost:3000/api/todos?page=${page}`);
    const totalPages = res.headers.get('X-Total-Pages');
    const data = await res.json();

    return {
        props: {
            todos: data,
            page:  page,
            totalPages: totalPages,
        }
    }
}
