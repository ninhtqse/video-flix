<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id')->nullable();
            $table->string('name')->nullable();
            $table->string('file_name',500)->nullable();
            $table->string('description',1000)->nullable();
            $table->integer('favourite')->nullable();
            $table->integer('access')->nullable();
            $table->string('time')->nullable();
            $table->string('avata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
