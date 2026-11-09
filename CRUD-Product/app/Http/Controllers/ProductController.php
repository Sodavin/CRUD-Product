<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('dashboard', [
            'metrics' => $this->metrics(),
            'recentProducts' => Product::query()->with('productCategory')->latest()->limit(5)->get(),
        ]);
    }

    public function index(Request $request): Response
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['nullable', Rule::in(['active', 'draft'])],
        ]);

        $products = Product::query()->with('productCategory')
            ->when($filters['search'] ?? null, function (Builder $query, string $search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('sku', 'like', "%{$search}%")
                        ->orWhereHas('productCategory', fn (Builder $categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"));
                });
            })
            ->when($filters['category'] ?? null, fn (Builder $query, string $category) => $query->whereHas('productCategory', fn (Builder $categoryQuery) => $categoryQuery->where('name', $category)))
            ->when($filters['status'] ?? null, fn (Builder $query, string $status) => $query->where('is_active', $status === 'active'))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => Category::query()->orderBy('name')->pluck('name'),
            'filters' => [
                'search' => $filters['search'] ?? '',
                'category' => $filters['category'] ?? '',
                'status' => $filters['status'] ?? '',
            ],
            'metrics' => $this->metrics(),
            'success' => $request->session()->get('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('products/create', [
            'categories' => Category::query()->orderBy('name')->pluck('name'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $product = Product::create($this->productData($this->validatedData($request)));

        return to_route('products.show', $product)->with('success', 'Product created successfully.');
    }

    public function show(Product $product): Response
    {
        $product->load('productCategory');

        return Inertia::render('products/show', [
            'product' => $product,
            'success' => request()->session()->get('success'),
        ]);
    }

    public function edit(Product $product): Response
    {
        $product->load('productCategory');

        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => Category::query()->orderBy('name')->pluck('name'),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->productData($this->validatedData($request, $product)));

        return to_route('products.show', $product)->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return to_route('products.index')->with('success', 'Product deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validatedData(Request $request, ?Product $product = null): array
    {
        $request->merge([
            'sku' => Str::upper(trim((string) $request->input('sku'))),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:100', 'alpha_dash', Rule::unique('products', 'sku')->ignore($product)],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:2000'],
            'price' => ['required', 'numeric', 'min:0', 'max:9999999999.99'],
            'stock' => ['required', 'integer', 'min:0', 'max:2147483647'],
            'status' => ['required', Rule::in(['active', 'draft'])],
        ]);

        return $validated;
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function productData(array $validated): array
    {
        $categoryName = trim($validated['category']);
        $category = Category::query()->firstOrCreate(
            ['slug' => Str::slug($categoryName) ?: Str::uuid()->toString()],
            ['name' => $categoryName],
        );
        unset($validated['category']);
        $validated['category_id'] = $category->id;
        $validated['slug'] = Str::slug($validated['sku']);

        return $validated;
    }

    /**
     * @return array{products: int, active: int, lowStock: int, inventoryValue: float}
     */
    private function metrics(): array
    {
        return [
            'products' => Product::query()->count(),
            'active' => Product::query()->where('is_active', true)->count(),
            'lowStock' => Product::query()->whereBetween('stock', [1, 5])->count()
                + Product::query()->where('stock', 0)->count(),
            'inventoryValue' => (float) (Product::query()
                ->selectRaw('COALESCE(SUM(price * stock), 0) as inventory_value')
                ->value('inventory_value') ?? 0),
        ];
    }
}
