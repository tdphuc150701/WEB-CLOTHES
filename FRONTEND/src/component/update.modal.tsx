import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateData } from '@/redux/dataSlice';
import { putProduct } from '../app/service/productService';
import Stack from '@mui/material/Stack';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

interface Iprops {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    setBlog: (value: IBlog | null) => void;
    blog: IBlog | null

}

function UpdateModal(props: Iprops) {
    const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImgUrl] = useState('');
    const [sale_price, setSale_Price] = useState('');
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id);
            setName(blog.name);
            setSale_Price(blog.sale_price.toString());
            setImgUrl(blog.imageUrl)
            setDescription(blog.description)
            setPrice(blog.price.toString())
            setStatus(blog.status.toString())
        }
    }, [blog]);

    const handleSummit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        putProduct(id, {
            name,
            sale_price,
            description,
            imageUrl,
            price: parseFloat(price),
            status: parseInt(status),

        })
            .then((updatedProduct: any) => {
                toast.success('Update Success!');
                handleCloseModal();
                dispatch(updateData(updatedProduct));
            })
            .catch((error: Error) => {
                console.error("Error:", error);
                toast.error("Error: " + error.message);
            });
    };

    const handleCloseModal = () => {
        setName('');
        setSale_Price('');
        setDescription('');
        setPrice('');
        setImgUrl('');
        setStatus('');
        setBlog(null);
        setShowModalUpdate(false);
    };

    return (
        <div>
            <Dialog
                open={showModalUpdate}
                onClose={() => handleCloseModal()}
                fullWidth
                maxWidth="sm"
                color='primary'
            >
                <DialogTitle>Add New Book</DialogTitle>
                <form onSubmit={handleSummit}>
                    <DialogContent>
                        <Stack spacing={2} margin={2}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Author"
                                variant="outlined"
                                fullWidth
                                value={sale_price}
                                onChange={(e) => setSale_Price(e.target.value)}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                label="Price"
                                variant="outlined"
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextField
                                label="Quantity_in_stock"
                                variant="outlined"
                                fullWidth
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <TextField
                                label="Img"
                                autoFocus
                                value={imageUrl}
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setImgUrl(e.target.value)}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="warning" type='submit'>
                            Submit
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default UpdateModal;