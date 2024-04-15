import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { deleteProduct } from '../app/service/productService';
import {
    Dialog,
    DialogContentText,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

interface Iprops {
    showModalDelete: boolean;
    setShowModalDelete: (value: boolean) => void;
    setBlog: (value: IBlog | null) => void;
    blog: IBlog | null
}

function DeleteModal(props: Iprops) {
    const { showModalDelete, setShowModalDelete, blog } = props;

    useEffect(() => {
        // Thực hiện các hành động cần thiết khi blog thay đổi
    }, [blog]);

    const handleDeleteBlog = async () => {
        try {
            if (!blog || !blog.id) {
                toast.error('Invalid blog data');
                return;
            }

            await deleteProduct(blog.id);

            // Sau khi xóa thành công, thực hiện các hành động cần thiết
            // Ví dụ: cập nhật giao diện, hiển thị thông báo, v.v.
            toast.success('Delete success!');
            handleCloseModal();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error: ' + error);
        }
    };

    const handleCloseModal = () => {
        setShowModalDelete(false);
    };

    return (
        <Dialog
            open={showModalDelete}
            onClose={handleCloseModal}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Confirm"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this item?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button variant="contained" color="warning" onClick={handleDeleteBlog}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteModal;