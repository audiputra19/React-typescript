export interface Product {
    id:         number;
    img:        string;
    title:      string;
    price:      number;
    rate:       string;
    disc:       number;
    condition:  string;
    category:   string;
    idcategory: string;
    genre:      string;
    idgenre:    string;
    color:      string[];
    size:       string[];
    desc:       string;
}

export interface TransactionI {
    id: number;
    img: string;
    title: string;
    price: number;
    disc: number;
    qty: number;
    size: string;
    transactionDate: Date;
}

export interface HisI {
    id: string;
    data: Array<Product>;
    date: Date;
}