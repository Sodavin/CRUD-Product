import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, PackagePlus } from 'lucide-react';
import { ProductForm } from '@/components/products/product-form';

export default function CreateProduct({
    categories,
}: {
    categories: string[];
}) {
    return (
        <>
            <Head title="Add product" />
            <main className="mx-auto w-full max-w-4xl space-y-4 p-4 sm:p-5 lg:p-6">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950 dark:hover:text-white"
                >
                    <ArrowLeft className="size-4" />
                    Back to products
                </Link>
                <header className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                        <PackagePlus className="size-6" />
                    </span>
                    <div>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                            Catalog / New
                        </p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                            Add a product
                        </h1>
                        <p className="mt-1 text-sm text-neutral-500">
                            Fill in the product details to add it to your
                            catalog.
                        </p>
                    </div>
                </header>
                <ProductForm categories={categories} />
            </main>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        { title: 'Products', href: '/products' },
        { title: 'Add product', href: '/products/create' },
    ],
};
