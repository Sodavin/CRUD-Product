import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Boxes, Plus } from 'lucide-react';
import { ProductMetricsCards } from '@/components/products/product-metrics';
import { ProductStatusBadge } from '@/components/products/product-status-badge';
import type { Product, ProductMetrics } from '@/components/products/types';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

export default function Dashboard({
    metrics,
    recentProducts,
}: {
    metrics: ProductMetrics;
    recentProducts: Product[];
}) {
    return (
        <>
            <Head title="Dashboard" />
            <main className="mx-auto w-full max-w-7xl space-y-5 p-4 sm:p-5 lg:p-6">
                <header className="flex flex-col justify-between gap-4 rounded-3xl border border-neutral-800 bg-neutral-950 p-4 text-white sm:flex-row sm:items-center sm:p-5 dark:border-neutral-700 dark:bg-black">
                    <div>
                        <p className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                            <Boxes className="size-4" />
                            PRODUCT WORKSPACE
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Your inventory, in focus.
                        </h1>
                        <p className="mt-1.5 max-w-xl text-sm leading-6 text-neutral-300">
                            Keep your catalog organized, stay ahead of low
                            stock, and manage every product from one place.
                        </p>
                    </div>
                    <Button
                        asChild
                        className="h-10 shrink-0 bg-white px-4 font-medium text-neutral-950 hover:bg-neutral-200"
                    >
                        <Link href="/products/create">
                            <Plus />
                            Add product
                        </Link>
                    </Button>
                </header>

                <ProductMetricsCards metrics={metrics} />

                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex flex-col gap-2 border-b border-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 dark:border-neutral-800">
                        <div>
                            <h2 className="font-semibold text-neutral-950 dark:text-white">
                                Recently added
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                The latest additions to your catalog.
                            </p>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/products">
                                View all products
                                <ArrowRight />
                            </Link>
                        </Button>
                    </div>
                    {recentProducts.length ? (
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.id}`}
                                    className="flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-neutral-50 sm:px-5 dark:hover:bg-neutral-800/40"
                                >
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                                            <Boxes className="size-5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-medium text-neutral-900 dark:text-white">
                                                {product.name}
                                            </span>
                                            <span className="mt-0.5 block text-xs text-neutral-500">
                                                {product.sku} ·{' '}
                                                {product.category}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-3">
                                        <span className="hidden text-sm text-neutral-500 sm:inline">
                                            {product.stock.toLocaleString()} in
                                            stock
                                        </span>
                                        <ProductStatusBadge
                                            status={product.status}
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="px-5 py-10 text-center">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
                                <Boxes className="size-6" />
                            </div>
                            <h3 className="mt-3 font-semibold text-neutral-900 dark:text-white">
                                Your catalog is ready
                            </h3>
                            <p className="mt-1 text-sm text-neutral-500">
                                Add your first product to start tracking
                                inventory.
                            </p>
                            <Button
                                asChild
                                className="mt-3 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                            >
                                <Link href="/products/create">
                                    <Plus />
                                    Add your first product
                                </Link>
                            </Button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
