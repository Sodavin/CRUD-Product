import { Head, Link } from '@inertiajs/react';
import { ArrowDownUp, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { ProductMetricsCards } from '@/components/products/product-metrics';
import { ProductTable } from '@/components/products/product-table';
import type { ProductMetrics, ProductPage } from '@/components/products/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
    products: ProductPage;
    categories: string[];
    filters: { search: string; category: string; status: string };
    metrics: ProductMetrics;
    success?: string;
};

export default function ProductsIndex({
    products,
    categories,
    filters,
    metrics,
    success,
}: Props) {
    const [search, setSearch] = useState(filters.search);
    const hasFilters = Boolean(
        filters.search || filters.category || filters.status,
    );

    return (
        <>
            <Head title="Products" />
            <main className="mx-auto w-full max-w-7xl space-y-5 p-4 pt-2 sm:p-5 sm:pt-3 lg:p-6 lg:pt-4">
                <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
                            <span className="size-2 rounded-full bg-emerald-600" />
                            Inventory workspace
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                            Products
                        </h1>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                            Manage your catalog, stock levels, and product
                            details.
                        </p>
                    </div>
                    <Button
                        asChild
                        className="h-9 bg-neutral-950 px-3 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                    >
                        <Link href="/products/create">
                            <Plus className="size-4" />
                            Add product
                        </Link>
                    </Button>
                </header>

                {success && (
                    <div
                        role="status"
                        className="rounded-xl border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                    >
                        {success}
                    </div>
                )}

                <ProductMetricsCards metrics={metrics} />

                <section className="space-y-3">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">
                                All products{' '}
                                <span className="ml-1 rounded-full bg-neutral-100 px-2 py-0.5 align-middle text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                    {products.total}
                                </span>
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                A clear view of everything in your catalog.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-2 text-xs text-neutral-400">
                            <ArrowDownUp className="size-3.5" />
                            Newest first
                        </span>
                    </div>
                    <form
                        method="get"
                        action="/products"
                        className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm sm:flex-row dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <label className="relative min-w-0 flex-1">
                            <span className="sr-only">Search products</span>
                            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                                name="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search products or SKU..."
                                className="border-transparent pl-9 shadow-none focus-visible:border-neutral-200 focus-visible:ring-0 dark:focus-visible:border-neutral-700"
                            />
                        </label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <label>
                                <span className="sr-only">
                                    Filter by category
                                </span>
                                <select
                                    name="category"
                                    defaultValue={filters.category}
                                    className="h-9 w-full min-w-40 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 outline-none focus:ring-2 focus:ring-neutral-400/40 sm:w-auto dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                                >
                                    <option value="">All categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span className="sr-only">
                                    Filter by status
                                </span>
                                <select
                                    name="status"
                                    defaultValue={filters.status}
                                    className="h-9 w-full min-w-32 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 outline-none focus:ring-2 focus:ring-neutral-400/40 sm:w-auto dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                                >
                                    <option value="">All statuses</option>
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </label>
                            <Button
                                type="submit"
                                variant="outline"
                                className="gap-2"
                            >
                                <SlidersHorizontal className="size-4" />
                                Filter
                            </Button>
                            {hasFilters && (
                                <Button
                                    asChild
                                    type="button"
                                    variant="ghost"
                                    aria-label="Clear filters"
                                >
                                    <Link href="/products">
                                        <X className="size-4" />
                                        Clear
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </form>
                    <ProductTable products={products} />
                </section>
                <footer className="pb-2 text-center text-xs text-neutral-400">
                    Product workspace · Inventory at a glance
                </footer>
            </main>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [{ title: 'Products', href: '/products' }],
};
