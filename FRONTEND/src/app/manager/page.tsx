/* eslint-disable @next/next/no-img-element */
'use client'
import TableComponent from "@/component/app.table"
import useSWR from 'swr';
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { mutate } from "swr"
import { useState } from "react";
import '@/styles/manage.css'
import CreateModal from "@/component/create.modal";
import UpdateModal from "@/component/update.modal";
import DeleteModal from "@/component/delete.modal";


interface Iprops {

    blogs: IBlog[]
    data: string

}



const BlogsPage = (props: Iprops) => {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const [blog, setBlog] = useState<IBlog | null>(null)

    const { data, error, isLoading } = useSWR(
        "http://localhost:8081/api/product",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    if (isLoading) {
        return <div>Loading...</div>
    }
    const rows = data

    const columns: GridColDef[] = [
        {
            field: 'index',
            headerName: 'STT',
            width: 100,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            valueGetter: (params: GridValueGetterParams) => {
                const index = rows.findIndex((row: any) => row.id === params.row.id) + 1;
                return index;
            },
        },


        { field: 'id', headerName: 'ID', width: 90, headerClassName: 'data', },

        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            editable: true,
        },

        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            width: 110,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'number',
            width: 110,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            editable: true,
        },
        {
            field: 'sale_price',
            headerName: 'Sale Price',
            width: 150,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            editable: true,
        },

        {
            field: 'image_url',
            headerName: 'Img',
            type: 'string',
            width: 110,
            editable: true,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <img
                            src={params?.row.imageUrl}
                            alt="Image" style={{ width: '75px', maxHeight: '100%' }} />
                    </div>
                )

            },
        },

        {
            field: 'Action',
            headerName: 'Action',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            headerAlign: 'center',
            headerClassName: 'data',
            align: 'center',
            renderCell: function (params: GridCellParams) {
                return (

                    <div>
                        <Button variant="contained"
                            onClick={() => {
                                setBlog(params.row);
                                setShowModalUpdate(true);
                            }}
                        >
                            Edit
                        </Button>
                        <Button variant="contained" color="warning" onClick={() => {
                            setBlog(params.row);
                            setShowModalDelete(true);
                        }}>

                            Delete
                        </Button>
                    </div >

                );
            },
        }
    ];


    return (
        <div>
            <div className='mb-3'
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Products</h3>
                <Button variant="contained" color="success" onClick={() => setShowModalCreate(true)}>Add New</Button>

            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>

            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />

            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                blog={blog}
                setBlog={setBlog}

            />
            <DeleteModal
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                blog={blog}
                setBlog={setBlog}

            />

        </div>
    )
}
export default BlogsPage