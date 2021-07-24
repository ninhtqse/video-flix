<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['namespace' => 'App\Http\Controllers'],function(){
    Route::get('/','HomeController@home');

    Route::get('videos/add','HomeController@getAdd');
    Route::post('videos/add','HomeController@postAdd');

    Route::get('video/{id}','HomeController@getDetail');

    Route::get('category/{id}','HomeController@categoryList');
});