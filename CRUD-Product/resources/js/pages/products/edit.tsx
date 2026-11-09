import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ProductForm } from '@/components/products/product-form';
import type { Product } from '@/components/products/types';

export default function EditProduct({
    product,
    categories,
}: {
    product: Product;
    categories: string[];
}) {
    return (
        <>
            <Head title={`Edit ${product.name}`} />
            <main className="mx-auto w-full max-w-4xl space-y-4 p-4 sm:p-5 lg:p-6">
                <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950 dark:hover:text-white"
                >
                    <ArrowLeft className="size-4" />
                    Back to product
                </Link>
                <header className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                        <Pencil className="size-5" />
                    </span>
                    <div>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Catalog / Edit
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                            Edit product
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500">
                            Update details for{' '}
                            <span className="font-medium text-neutral-700 dark:text-neutral-200">
                                {product.name}
                            </span>
                            .
                        </p>
                    </div>
                </header>
                <ProductForm product={product} categories={categories} />
            </main>
        </>
    );
}

EditProduct.layout = {
    breadcrumbs: [
        { title: 'Products', href: '/products' },
        { title: 'Edit product', href: '/products' },
    ],
};
