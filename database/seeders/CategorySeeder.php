<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr = [
            [
                'id'    => 1,
                'name'  => 'VIETNAM' 
            ],
            [
                'id'    => 2,
                'name'  => 'US' 
            ],
            [
                'id'    => 3,
                'name'  => 'KOREA' 
            ],
            [
                'id'    => 4,
                'name'  => 'CHINA' 
            ],
            [
                'id'    => 5,
                'name'  => 'JAPAN' 
            ],
            [
                'id'    => 6,
                'name'  => 'SINGAPORE' 
            ],
        ];
        \DB::table('categories')->insert($arr);
    }
}
