export type Product = {
    id: number;
    name: string;
    sku: string;
    category: string;
    description: string | null;
    price: string;
    stock: number;
    status: 'active' | 'draft';
    created_at: string;
    updated_at: string;
};

export type ProductFormData = {
    name: string;
    sku: string;
    category: string;
    description: string;
    price: string;
    stock: string;
    status: 'active' | 'draft';
};

export type ProductMetrics = {
    products: number;
    active: number;
    lowStock: number;
    inventoryValue: number;
};

export type ProductPage = {
    data: Product[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
};
