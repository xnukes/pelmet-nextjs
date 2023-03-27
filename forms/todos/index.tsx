import { useFormik } from "formik";
import * as Yup from "yup";
import { ApiTodoType } from "../../types/api";
import { TagsInput } from "react-tag-input-component";
import { useRouter } from "next/router";
import { postTodo, putTodo } from "../../lib/todos";

const ValidationSchema = Yup.object().shape({
    title: Yup.string().required("Název nesmí být prázdný"),
    description: Yup.string().required("Popis nesmí být prázdný"),
    tags: Yup.array().required("Tagy jsou povinné"),
    dueDate: Yup.string().required("Datum splnění je povinné"),
    completed: Yup.boolean(),
});

type TodosEditFormProps = {
    initialValues: ApiTodoType;
}

const TodosEditForm = (props: TodosEditFormProps) => {

    const router = useRouter();

    const { initialValues } = props;

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: ValidationSchema,
        onSubmit: (values: ApiTodoType) => {
            if (!values.id) {
                postTodo(values)
                    .then(() => {
                        router.push("/todos");
                    });
            } else {
                putTodo(values)
                    .then(() => {
                        router.push("/todos");
                    });
            }
        }
    });

    const { errors, touched, values, setValues, handleChange, handleSubmit } = formik;

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Název</label>
                    <input type="text" name="title" id="first-name" autoComplete="given-name" value={values.title} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    {errors.title && touched.title && <div className="text-red-500">{errors.title}</div>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Popis</label>
                    <input type="text" name="description" id="last-name" autoComplete="family-name" value={values.description} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    {errors.description && touched.description && <div className="text-red-500">{errors.description}</div>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tagy</label>
                    <TagsInput
                        classNames={{
                            tag: "text-gray-700 rounded px-3 py-1 mx-0 text-xs font-normal",
                            input: "w-full h-6 p-0",
                        }}
                        value={values.tags}
                        onChange={(tags) => setValues({ ...values, tags })}
                        name="tags"
                        placeHolder=""
                    />
                    {errors.tags && touched.tags && <div className="text-red-500">{errors.tags}</div>}
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Datum splnění</label>
                    <input type="date" name="dueDate" id="dueDate" autoComplete="dueDate" value={values.dueDate} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    {errors.dueDate && touched.dueDate && <div className="text-red-500">{errors.dueDate}</div>}
                </div>
                <div className="col-span-6 sm:col-span-3 relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                            id="completed"
                            name="completed"
                            type="checkbox"
                            checked={values.completed}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm leading-6 px-5">
                        <label htmlFor="completed" className="font-medium text-gray-900">
                            Splněno
                        </label>
                        <p className="text-gray-700 text-sm font-extralight">Označte v případě splněného úkolu.</p>
                    </div>
                    {errors.completed && touched.completed && <div className="text-red-500">{errors.completed}</div>}
                </div>
            </div>

            <hr className="my-4" />

            <div className="relative flex justify-end space-x-2">
                <div className="flex-col">
                    <button type="button" onClick={() => router.back()} className="text-gray-700 bg-white hover:bg-gray-100 border rounded-md px-3 py-2 text-sm font-medium">
                        Jít zpět
                    </button>
                </div>
                <div className="flex-col">
                    <button type="submit" className="text-white bg-gray-700 hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium">
                        Uložit změny
                    </button>
                </div>
            </div>

        </form>
    );
}

export default TodosEditForm;
