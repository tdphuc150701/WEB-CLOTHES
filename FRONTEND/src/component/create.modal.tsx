import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { postProduct } from '../app/service/productService';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';

interface Iprops {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}

function CreateModal(props: Iprops) {
    const { showModalCreate, setShowModalCreate } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState('');

    const handleSummit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productData = {
            name,
            status,
            description,
            price,
            sale_price: salePrice,
            imgURL: image,
        };

        try {
            const newProduct = await postProduct(productData);
            toast.success('Create success!');
            mutate('https:localhost:8081/api/product');
            handleCloseModal();
            console.log(newProduct);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error: ' + error);
        }
    };

    const handleCloseModal = () => {
        setName('');
        setDescription('');
        setPrice('');
        setStatus('');
        setSalePrice('');
        setImage('');
        setShowModalCreate(false);
    };

    return (
        <div>
            <Dialog
                open={showModalCreate}
                onClose={() => setShowModalCreate(false)}
                fullWidth
                maxWidth="sm"
                color="primary"
            >
                <form onSubmit={handleSummit}>
                    <DialogTitle>Add New Book</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            label="salePrice"
                            variant="outlined"
                            fullWidth
                            value={salePrice}
                            onChange={(e) => setSalePrice(e.target.value)}
                        />
                        <TextField
                            label="Status"
                            variant="outlined"
                            fullWidth
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <TextField
                            label="image"
                            variant="outlined"
                            fullWidth
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" type="submit">
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

export default CreateModal;