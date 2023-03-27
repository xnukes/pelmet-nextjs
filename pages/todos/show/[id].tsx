import { useRouter } from "next/router";
import { Layout } from "../../../components";
import { useTodoById } from "../../../lib/todos";
import { NextPage } from "next";
import TodosEditForm from "../../../forms/todos";

const TodosShowPage: NextPage = () => {
    const router = useRouter();
    const id = router.query.id;
    const { data, isLoading, isFetching, isError } = useTodoById(parseInt(id as string));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout title="Podrobnosti o úkolu">
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {(isLoading || isFetching) && <div>Načítám úkoly...</div>}
                        {isError && <div>Chyba: Nezle načíst data...</div>}
                        Pracujeme na tom...
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default TodosShowPage;
