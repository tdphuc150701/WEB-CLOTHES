import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useSWR from 'swr';
import Box from '@mui/material/Box';
import { getProducts } from "../app/service/productService";
import Link from 'next/link';
import axios from 'axios';
// import data from '@/db.json'



// const data = [
//     {
//         "title": "a",
//         "author": "a",
//         "content": "a",
//         "id": 1
//     },
//     {
//         "title": "ababa",
//         "author": "bababaaaaaaaaaa",
//         "content": "aaaaaa",
//         "id": 2
//     }
// ]

function Blog() {

    const [products, setProducts] = React.useState([]);
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    console.log(products)

    return (
        <div>
            <Typography variant="h5" component="div" align='center'>
                Home
            </Typography>

            {Array.isArray(products) && products.map((item: any) => (
                <Box key={item.id}>
                    <Accordion expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${item.id}bh-content`}
                            id={`panel${item.id}bh-header`}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {item.name}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{item.title} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {item.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            ))}
        </div>

    );

}

export default Blog