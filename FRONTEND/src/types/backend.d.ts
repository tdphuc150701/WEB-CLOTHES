interface IBlog {

    id: Long;
    blog: []
    price: number;
    rate: number;
    imageUrl: string; //biến nhận vào cả hai kiểu sữ liệu null hoặc string. chưa hiểu lắm
    count: number;
    search: any;
    quantity_in_stock: number;
    created_at: Date;
    publication_date: Date;
    description: string
    name: string;
    categoryName: string;
    sale_price: number;
    status: number;
    category_id: number;
    categoryID: number;


}

interface IUser {
    username: string;
    phone: number;
    email: string;
    password: string;
    // user: []
    id: string;


}
interface ICartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;

    };
}
