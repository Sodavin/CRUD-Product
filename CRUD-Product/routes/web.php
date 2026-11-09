<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/products')->name('home');

Route::get('dashboard', [ProductController::class, 'dashboard'])->name('dashboard');
Route::resource('products', ProductController::class);

require __DIR__.'/settings.php';
