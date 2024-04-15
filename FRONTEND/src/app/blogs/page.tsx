'use client'
import TableComponent from "@/component/app.table";
import { getProducts } from "../service/productService";
import { useEffect, useState } from "react";

interface Iprops {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    blogs: IBlog[];
    products: string;
}

const BlogsPage = (props: Iprops) => {
    const { showModalUpdate, setShowModalUpdate } = props;
    const [products, setProducts] = useState<IBlog[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                setError(`Error fetching products: ${error}`);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (

        <div>
            <TableComponent blogs={products} />
        </div>
    );
};

export default BlogsPage;