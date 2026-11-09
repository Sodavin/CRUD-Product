<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('products')) {
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->foreignId('category_id')->constrained()->restrictOnDelete();
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('sku')->unique();
                $table->text('description')->nullable();
                $table->decimal('price', 12, 2);
                $table->unsignedInteger('stock')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
                $table->softDeletes();
            });
        } elseif (! Schema::hasColumn('products', 'sku')) {
            Schema::table('products', function (Blueprint $table) {
                $table->string('sku')->nullable();
            });
        }

        if (Schema::hasColumn('products', 'sku')) {
            DB::table('products')
                ->whereNull('sku')
                ->orderBy('id')
                ->get(['id'])
                ->each(function (object $product): void {
                    DB::table('products')
                        ->where('id', $product->id)
                        ->update(['sku' => 'LEGACY-'.$product->id]);
                });

            if (! Schema::hasIndex('products', 'products_sku_unique')) {
                Schema::table('products', function (Blueprint $table) {
                    $table->unique('sku');
                });
            }
        }
    }

    public function down(): void
    {
        if (Schema::hasIndex('products', 'products_sku_unique')) {
            Schema::table('products', function (Blueprint $table) {
                $table->dropUnique('products_sku_unique');
            });
        }

        if (Schema::hasColumn('products', 'sku')) {
            Schema::table('products', function (Blueprint $table) {
                $table->dropColumn('sku');
            });
        }
    }
};
