<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'sku',
        'description',
        'price',
        'stock',
        'status',
        'category_id',
        'slug',
        'is_active',
    ];

    protected $appends = ['category', 'status'];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function productCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    protected function category(): Attribute
    {
        return Attribute::get(fn (): string => $this->productCategory?->name ?? 'Uncategorized');
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: fn (): string => $this->is_active ? 'active' : 'draft',
            set: fn (string $value): array => ['is_active' => $value === 'active'],
        );
    }
}
