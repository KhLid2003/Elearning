<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('user.index');
});
Route::get('/about', function () {
    return view('user.about');
});
Route::get('/courses', function () {
    return view('user.courses');
});
Route::get('/contact', function () {
    return view('user.contact');
});
Route::get('/francais', function () {
    return view('user.francais');
});
Route::get('/anglais', function () {
    return view('user.anglais');
});
Route::get('/allemand', function () {
    return view('user.allemand');
});
Route::get('/register', function () {
    return view('auth.register');
});
Route::get('/login', function () {
    return view('auth.login');
});

// admin

Route::get('/home', function () {
    return view('admin.index');
});
Route::get('/message', [AdminController::class , 'messages']);
Route::get('/clients', [AdminController::class , 'clients']);
Route::get('/messageShow/{id}', [AdminController::class , 'messageShow']);
Route::delete('/messageDestroy/{id}', [AdminController::class , 'messageDestroy']);


Route::get('/redirect',[RedirectController::class , 'redirect']);

Route::post('message',[MessageController::class, 'message']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
