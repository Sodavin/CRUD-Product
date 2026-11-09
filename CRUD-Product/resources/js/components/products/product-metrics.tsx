import {
    Boxes,
    CircleDollarSign,
    PackageCheck,
    TriangleAlert,
} from 'lucide-react';
import type { ProductMetrics } from '@/components/products/types';

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

export function ProductMetricsCards({ metrics }: { metrics: ProductMetrics }) {
    const cards = [
        {
            label: 'Total products',
            value: metrics.products.toLocaleString(),
            detail: 'Across your catalog',
            icon: Boxes,
            tone: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200',
        },
        {
            label: 'Active products',
            value: metrics.active.toLocaleString(),
            detail: 'Currently published',
            icon: PackageCheck,
            tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        },
        {
            label: 'Needs attention',
            value: metrics.lowStock.toLocaleString(),
            detail: 'At or below 5 in stock',
            icon: TriangleAlert,
            tone: 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
        },
        {
            label: 'Inventory value',
            value: currency.format(metrics.inventoryValue),
            detail: 'Based on current stock',
            icon: CircleDollarSign,
            tone: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200',
        },
    ];

    return (
        <section
            aria-label="Product summary"
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
            {cards.map(({ label, value, detail, icon: Icon, tone }) => (
                <article
                    key={label}
                    className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                {label}
                            </p>
                            <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                {value}
                            </p>
                        </div>
                        <span
                            className={`inline-flex size-10 items-center justify-center rounded-xl ${tone}`}
                        >
                            <Icon className="size-5" />
                        </span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                        {detail}
                    </p>
                </article>
            ))}
        </section>
    );
}
