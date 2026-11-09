<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests can access product management', function () {
    $this->get(route('products.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('products/index'));
});

test('authenticated users can browse and filter products', function () {
    $this->actingAs(User::factory()->create());

    $category = Category::create(['name' => 'Audio', 'slug' => 'audio']);
    Product::create([
        'name' => 'Studio Headphones',
        'sku' => 'STUDIO-001',
        'category_id' => $category->id,
        'slug' => 'studio-headphones-studio-001',
        'price' => 149.99,
        'stock' => 12,
        'status' => 'active',
    ]);

    $this->get(route('products.index', ['search' => 'STUDIO', 'category' => 'Audio', 'status' => 'active']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('products/index')
            ->where('products.total', 1)
            ->where('products.data.0.sku', 'STUDIO-001')
            ->where('metrics.active', 1)
        );
});

test('a product can be created updated viewed and deleted', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('products.store'), [
        'name' => 'Wireless Keyboard',
        'sku' => 'wireless-001',
        'category' => 'Accessories',
        'description' => 'Low-profile mechanical keyboard.',
        'price' => '89.50',
        'stock' => '8',
        'status' => 'active',
    ])->assertRedirect();

    $product = Product::query()->where('sku', 'WIRELESS-001')->firstOrFail();

    $this->get(route('products.show', $product))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('products/show')->where('product.name', 'Wireless Keyboard'));

    $this->put(route('products.update', $product), [
        'name' => 'Wireless Keyboard Pro',
        'sku' => 'WIRELESS-001',
        'category' => 'Accessories',
        'description' => null,
        'price' => '99.00',
        'stock' => '4',
        'status' => 'draft',
    ])->assertRedirect(route('products.show', $product));

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Wireless Keyboard Pro',
        'price' => '99.00',
        'stock' => 4,
        'is_active' => false,
    ]);

    $this->delete(route('products.destroy', $product))->assertRedirect(route('products.index'));
    $this->assertSoftDeleted('products', ['id' => $product->id]);
});

test('product validation rejects duplicate sku and invalid stock', function () {
    $this->actingAs(User::factory()->create());

    $category = Category::create(['name' => 'General', 'slug' => 'general']);
    Product::create([
        'name' => 'Existing item',
        'sku' => 'EXISTING-001',
        'category_id' => $category->id,
        'slug' => 'existing-item-existing-001',
        'price' => 10,
        'stock' => 2,
        'status' => 'active',
    ]);

    $this->from(route('products.create'))->post(route('products.store'), [
        'name' => 'Duplicate item',
        'sku' => 'existing-001',
        'category' => 'General',
        'price' => 10,
        'stock' => -1,
        'status' => 'active',
    ])->assertSessionHasErrors(['sku', 'stock']);
});
