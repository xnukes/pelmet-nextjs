import { Layout } from "../../components";
import TodosTable from "../../tables/todos";
import { useTodos } from "../../lib/todos";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BellIcon, CheckIcon, MinusCircleIcon, PlusCircleIcon, StopIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Selection } from "@react-types/shared";
import { Tooltip } from "@nextui-org/react";

export default function TodosPage() {

    const router = useRouter()

    const [ page, setPage ] = useState(1);
    const [ selected, setSelected ] = useState([]);

    const { isLoading, isFetching, isError, data } = useTodos(page);

    function handleOnPageChange(newpage: number)
    {
        setPage(newpage);
        router.push(`/todos/?page=${newpage}`, undefined, { shallow: true });
    }

    useEffect(() => {
        if (router.query.page) {
            setPage(parseInt(router.query.page.toString()));
        }
    }, [ router.query.page, selected ]);

    const handleOnSelectionChange = (values: Selection) => {
        setSelected(Array.from(values));
        console.log(Array.from(values));
    }

    return (
        <Layout title="Úkoly">
            <div className="flex flex-col">
                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle space-x-2 text-right inline-block min-w-full sm:px-6 lg:px-8">
                        {(selected.length > 0) && (<>
                            <Tooltip content={<span>Změnit na nedokončené ({selected.length})</span>}>
                                <Link href="#" onClick={() => alert(selected)} className="group relative flex-col pl-10 justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                        <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                </Link>
                            </Tooltip>
                            <Tooltip content={<span>Dokončit úkoly ({selected.length})</span>}>
                                <Link href="#" onClick={() => alert(selected)} className="group relative flex-col pl-10 justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                        <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                    </span>
                                </Link>
                            </Tooltip>
                            <Link href="#" onClick={() => alert(selected)} className="group relative flex-col pl-10 justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MinusCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                                Smazat ({selected.length})
                            </Link>
                        </>)}
                        <Link href="/todos/create" className="group relative flex-col pl-10 justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <PlusCircleIcon className="h-5 w-5 text-white" aria-hidden="true" />
                            </span>
                            Vytvořit úkol
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {(isLoading || isFetching) && <div>Načítám úkoly...</div>} {isError &&
                        <div>Chyba: Nezle načíst tabulku...</div>} {data && <TodosTable
                        todos={data}
                        options={{
                            onPageChange: handleOnPageChange,
                            onSelectionChange: (selected) => handleOnSelectionChange(selected),
                            page: page,
                            totalPages: 2, // TODO: totalPages from API
                        }} />
                    }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
