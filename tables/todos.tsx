import { ApiTodoType, ApiTodosType } from "../types/api";
import React from "react";
import { Col, Row, StyledBadge, Table, Tooltip } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon, IconButton } from "../components/ui";
import { DateFormat } from "../components";
import { useRouter } from "next/router";
import { Selection } from "@react-types/shared";

type OptionsProps = {
    onSort?: (columnKey: string, direction: "asc" | "desc") => void;
    onFilter?: (columnKey: string, value: string) => void;
    onPageChange?: (page: number) => void;
    onSelectionChange?: (selected: Selection) => void;
    page?: number;
    totalPages?: number;
}

export default function TodosTable({ todos, options }: { todos: ApiTodosType, options?: OptionsProps }) {

    const router = useRouter();

    const columns = [
        {
            key: "title",
            label: "Název",
            allowsSorting: true,
        },
        {
            key: "description",
            label: "Popis",
        },
        {
            key: "tags",
            label: "Tagy",
        },
        {
            key: "dueDate",
            label: "Termín",
            allowsSorting: true,
        },
        {
            key: "completed",
            label: "Dokončeno",
            allowsSorting: true,
        },
        {
            key: "actions",
            label: "Akce",
        }
    ];

    const renderCell = (row: ApiTodoType, columnKey) => {
        const cellValue = row[columnKey];
        switch (columnKey) {
            case "tags":
                return <StyledBadge color={'secondary'}>{cellValue.join(", ")}</StyledBadge>;

            case "dueDate":
                return <DateFormat dateString={row.dueDate} />;

            case "completed":
                return <StyledBadge color={cellValue ? 'success' : 'error'}>{cellValue ? "Ano" : "Ne"}</StyledBadge>;

            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Podrobnosti">
                                <IconButton onClick={() => router.push("/todos/show/" + row.id)}>
                                    <EyeIcon size={20} fill="#090909" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Změnit záznam">
                                <IconButton onClick={() => router.push("/todos/edit/" + row.id)}>
                                    <EditIcon size={20} fill="#0036db" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Smazat záznam"
                                color="error"
                                onClick={() => console.log("Smazat záznam", row.id)}
                            >
                                <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };

    return (
        <Table
            aria-label="Seznam úkolů"
            selectionMode="multiple"
            bordered
            shadow={false}
            onSelectionChange={options.onSelectionChange}
            css={{
                height: "auto",
                minWidth: "100%",
            }}>
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key} allowsSorting={column.allowsSorting}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={todos}>
                {(item) => (
                    <Table.Row key={item.id}>
                        {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
            <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={3}
                page={options?.page || 1}
                total={options?.totalPages || 1}
                onPageChange={(page) => {
                    if (options?.onPageChange && typeof options.onPageChange === "function")
                        options.onPageChange(page);
                }}
                title="Stránkování"
            />
        </Table>
    );
}
