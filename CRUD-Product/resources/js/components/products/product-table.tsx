import { Link, router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUpRight,
    Eye,
    Package,
    Pencil,
    Trash2,
} from 'lucide-react';
import { ProductStatusBadge } from '@/components/products/product-status-badge';
import type { Product, ProductPage } from '@/components/products/types';
import { Button } from '@/components/ui/button';

const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function StockIndicator({ stock }: { stock: number }) {
    const tone =
        stock === 0
            ? 'font-semibold text-neutral-950 dark:text-white'
            : stock <= 5
              ? 'font-semibold text-amber-700 dark:text-amber-300'
              : 'text-neutral-700 dark:text-neutral-200';
    const label =
        stock === 0 ? 'Out of stock' : stock <= 5 ? 'Low stock' : 'In stock';
    return (
        <div>
            <p className={`font-medium ${tone}`}>{stock.toLocaleString()}</p>
            <p className="mt-0.5 text-xs text-neutral-400">{label}</p>
        </div>
    );
}

function deleteProduct(product: Product) {
    if (
        window.confirm(
            `Delete "${product.name}"? This action cannot be undone.`,
        )
    ) {
        router.delete(`/products/${product.id}`, { preserveScroll: true });
    }
}

export function ProductTable({ products }: { products: ProductPage }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] text-left text-sm">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-950/60 dark:text-neutral-400">
                        <tr>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Stock</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        {products.data.map((product) => (
                            <tr
                                key={product.id}
                                className="transition-colors hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40"
                            >
                                <td className="px-4 py-3">
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="group flex min-w-56 items-center gap-2.5"
                                    >
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200">
                                            <Package className="size-5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate font-medium text-neutral-900 group-hover:underline dark:text-white">
                                                {product.name}
                                            </span>
                                            <span className="mt-0.5 block text-xs text-neutral-400">
                                                {product.sku}
                                            </span>
                                        </span>
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-neutral-600 dark:text-neutral-300">
                                    {product.category}
                                </td>
                                <td className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-200">
                                    {money.format(Number(product.price))}
                                </td>
                                <td className="px-4 py-3">
                                    <StockIndicator stock={product.stock} />
                                </td>
                                <td className="px-4 py-3">
                                    <ProductStatusBadge
                                        status={product.status}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            asChild
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`View ${product.name}`}
                                        >
                                            <Link
                                                href={`/products/${product.id}`}
                                            >
                                                <Eye className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Edit ${product.name}`}
                                        >
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                            >
                                                <Pencil className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Delete ${product.name}`}
                                            onClick={() =>
                                                deleteProduct(product)
                                            }
                                            className="text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.data.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-5 py-12 text-center"
                                >
                                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500 dark:bg-neutral-800">
                                        <Package className="size-6" />
                                    </div>
                                    <h3 className="mt-3 font-semibold text-neutral-900 dark:text-white">
                                        No products found
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-500">
                                        Try changing your filters or add your
                                        first product.
                                    </p>
                                    <Button
                                        asChild
                                        className="mt-3 bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                                    >
                                        <Link href="/products/create">
                                            Add a product <ArrowUpRight />
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {products.last_page > 1 && (
                <div className="flex flex-col gap-2 border-t border-neutral-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
                    <p className="text-sm text-neutral-500">
                        Showing{' '}
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">
                            {products.from ?? 0}–{products.to ?? 0}
                        </span>{' '}
                        of{' '}
                        <span className="font-medium text-neutral-700 dark:text-neutral-200">
                            {products.total}
                        </span>{' '}
                        products
                    </p>
                    <nav
                        aria-label="Product pages"
                        className="flex flex-wrap gap-1"
                    >
                        {products.links.map((link, index) => {
                            const label = link.label
                                .replace(/&laquo;|&raquo;/g, '')
                                .trim();
                            const isPrevious = index === 0;
                            const isNext = index === products.links.length - 1;
                            return link.url ? (
                                <Link
                                    key={`${link.label}-${index}`}
                                    href={link.url}
                                    preserveScroll
                                    className={`inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg border px-3 text-sm transition-colors ${link.active ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800'}`}
                                >
                                    {isPrevious && (
                                        <ArrowDown className="size-3 rotate-90" />
                                    )}
                                    {isNext
                                        ? 'Next'
                                        : isPrevious
                                          ? 'Previous'
                                          : label}
                                    {isNext && (
                                        <ArrowUpRight className="size-3" />
                                    )}
                                </Link>
                            ) : (
                                <span
                                    key={`${link.label}-${index}`}
                                    className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-neutral-100 px-3 text-sm text-neutral-400 dark:border-neutral-800"
                                >
                                    {isPrevious || isNext ? label : link.label}
                                </span>
                            );
                        })}
                    </nav>
                </div>
            )}
        </div>
    );
}
