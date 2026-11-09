import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CalendarDays,
    Package,
    Pencil,
    Tag,
    Trash2,
} from 'lucide-react';
import { ProductStatusBadge } from '@/components/products/product-status-badge';
import type { Product } from '@/components/products/types';
import { Button } from '@/components/ui/button';

const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function ShowProduct({
    product,
    success,
}: {
    product: Product;
    success?: string;
}) {
    function removeProduct() {
        if (
            window.confirm(
                `Delete "${product.name}"? This action cannot be undone.`,
            )
        ) {
            router.delete(`/products/${product.id}`);
        }
    }

    return (
        <>
            <Head title={product.name} />
            <main className="mx-auto w-full max-w-5xl space-y-4 p-4 sm:p-5 lg:p-6">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950 dark:hover:text-white"
                >
                    <ArrowLeft className="size-4" />
                    Back to products
                </Link>
                {success && (
                    <div
                        role="status"
                        className="rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                        {success}
                    </div>
                )}
                <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex flex-col gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-neutral-800">
                        <div className="flex items-start gap-3">
                            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                                <Package className="size-7" />
                            </span>
                            <div>
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <ProductStatusBadge
                                        status={product.status}
                                    />
                                    <span className="text-xs text-neutral-400">
                                        {product.sku}
                                    </span>
                                </div>
                                <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
                                    {product.name}
                                </h1>
                                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-neutral-500">
                                    <Tag className="size-3.5" />
                                    {product.category}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button asChild variant="outline">
                                <Link href={`/products/${product.id}/edit`}>
                                    <Pencil />
                                    Edit
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={removeProduct}
                                className="text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                            >
                                <Trash2 />
                                Delete
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-6 p-5 sm:grid-cols-3 sm:p-6">
                        <div>
                            <p className="text-sm text-neutral-500">
                                Unit price
                            </p>
                            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                {money.format(Number(product.price))}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">
                                Available stock
                            </p>
                            <p
                                className={`mt-1.5 text-2xl font-semibold tracking-tight ${product.stock <= 5 ? 'text-amber-700 dark:text-amber-300' : 'text-neutral-950 dark:text-white'}`}
                            >
                                {product.stock.toLocaleString()}{' '}
                                <span className="text-sm font-normal text-neutral-500">
                                    units
                                </span>
                            </p>
                            {product.stock <= 5 && (
                                <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                                    {product.stock === 0
                                        ? 'Restock needed'
                                        : 'Low stock — consider restocking'}
                                </p>
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">
                                Inventory value
                            </p>
                            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                {money.format(
                                    Number(product.price) * product.stock,
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-neutral-100 p-5 sm:p-6 dark:border-neutral-800">
                        <h2 className="font-semibold text-neutral-950 dark:text-white">
                            Description
                        </h2>
                        <p className="mt-2 text-sm leading-7 whitespace-pre-wrap text-neutral-600 dark:text-neutral-300">
                            {product.description ||
                                'No description has been added for this product.'}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-neutral-100 bg-neutral-50/70 px-5 py-3 text-xs text-neutral-500 sm:px-6 dark:border-neutral-800 dark:bg-neutral-950/30">
                        <span className="inline-flex items-center gap-2">
                            <CalendarDays className="size-3.5" />
                            Created{' '}
                            {new Date(product.created_at).toLocaleDateString()}
                        </span>
                        <span>
                            Last updated{' '}
                            {new Date(product.updated_at).toLocaleDateString()}
                        </span>
                    </div>
                </section>
            </main>
        </>
    );
}

ShowProduct.layout = {
    breadcrumbs: [
        { title: 'Products', href: '/products' },
        { title: 'Product details', href: '/products' },
    ],
};
