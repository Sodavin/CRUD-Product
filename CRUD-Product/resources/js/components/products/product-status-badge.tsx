import { Badge } from '@/components/ui/badge';

export function ProductStatusBadge({ status }: { status: 'active' | 'draft' }) {
    return (
        <Badge
            variant="outline"
            className={
                status === 'active'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
            }
        >
            <span
                className={`size-1.5 rounded-full ${status === 'active' ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-neutral-400'}`}
            />
            {status === 'active' ? 'Active' : 'Draft'}
        </Badge>
    );
}
