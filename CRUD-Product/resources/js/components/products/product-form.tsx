import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import { useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Product, ProductFormData } from '@/components/products/types';

const emptyProduct: ProductFormData = {
    name: '',
    sku: '',
    category: '',
    description: '',
    price: '',
    stock: '0',
    status: 'active',
};

export function ProductForm({
    product,
    categories,
}: {
    product?: Product;
    categories: string[];
}) {
    const form = useForm<ProductFormData>(
        product
            ? {
                  name: product.name,
                  sku: product.sku,
                  category: product.category,
                  description: product.description ?? '',
                  price: product.price,
                  stock: String(product.stock),
                  status: product.status,
              }
            : emptyProduct,
    );
    const isEditing = Boolean(product);

    useEffect(() => {
        if (form.data.name && !form.data.sku) {
            form.setData(
                'sku',
                form.data.name
                    .trim()
                    .toUpperCase()
                    .replace(/[^A-Z0-9]+/g, '-')
                    .replace(/^-|-$/g, ''),
            );
        }
    }, [form.data.name]);

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (product) {
            form.put(`/products/${product.id}`);
        } else {
            form.post('/products');
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="mb-4">
                    <h2 className="text-base font-semibold text-neutral-950 dark:text-white">
                        Product information
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Add the details customers and your team need.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Product name{' '}
                            <span className="text-neutral-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(event) =>
                                form.setData('name', event.target.value)
                            }
                            placeholder="e.g. Studio Headphones"
                            autoFocus
                            aria-invalid={Boolean(form.errors.name)}
                        />
                        <InputError message={form.errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sku">
                            SKU <span className="text-neutral-500">*</span>
                        </Label>
                        <Input
                            id="sku"
                            value={form.data.sku}
                            onChange={(event) =>
                                form.setData(
                                    'sku',
                                    event.target.value.toUpperCase(),
                                )
                            }
                            placeholder="e.g. STUDIO-001"
                            aria-invalid={Boolean(form.errors.sku)}
                        />
                        <InputError message={form.errors.sku} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">
                            Category <span className="text-neutral-500">*</span>
                        </Label>
                        <Input
                            id="category"
                            list="product-categories"
                            value={form.data.category}
                            onChange={(event) =>
                                form.setData('category', event.target.value)
                            }
                            placeholder="e.g. Electronics"
                            aria-invalid={Boolean(form.errors.category)}
                        />
                        <datalist id="product-categories">
                            {categories.map((category) => (
                                <option key={category} value={category} />
                            ))}
                        </datalist>
                        <InputError message={form.errors.category} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            value={form.data.status}
                            onChange={(event) =>
                                form.setData(
                                    'status',
                                    event.target
                                        .value as ProductFormData['status'],
                                )
                            }
                            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                        </select>
                        <InputError message={form.errors.status} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">
                            Price <span className="text-neutral-500">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-neutral-500">
                                $
                            </span>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.data.price}
                                onChange={(event) =>
                                    form.setData('price', event.target.value)
                                }
                                placeholder="0.00"
                                className="pl-7"
                                aria-invalid={Boolean(form.errors.price)}
                            />
                        </div>
                        <InputError message={form.errors.price} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="stock">
                            Stock quantity{' '}
                            <span className="text-neutral-500">*</span>
                        </Label>
                        <Input
                            id="stock"
                            type="number"
                            min="0"
                            step="1"
                            value={form.data.stock}
                            onChange={(event) =>
                                form.setData('stock', event.target.value)
                            }
                            aria-invalid={Boolean(form.errors.stock)}
                        />
                        <InputError message={form.errors.stock} />
                    </div>
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            rows={5}
                            maxLength={2000}
                            value={form.data.description}
                            onChange={(event) =>
                                form.setData('description', event.target.value)
                            }
                            placeholder="Share useful details about this product..."
                            className="w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <div className="flex items-center justify-between gap-3">
                            <InputError message={form.errors.description} />
                            <span className="ml-auto text-xs text-neutral-400">
                                {form.data.description.length}/2000
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
                <Button asChild variant="outline">
                    <Link
                        href={product ? `/products/${product.id}` : '/products'}
                    >
                        <ArrowLeft />
                        Cancel
                    </Link>
                </Button>
                <Button
                    type="submit"
                    disabled={form.processing}
                    className="bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                    {form.processing ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <Save />
                    )}
                    {form.processing
                        ? 'Saving…'
                        : isEditing
                          ? 'Save changes'
                          : 'Create product'}
                </Button>
            </div>
        </form>
    );
}
