<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
    public function home()
    {
        $categories = DB::table('categories')->get();
        return view('client.home.index',compact('categories'));
    }

    public function getAdd()
    {
        $categories = DB::table('categories')->get();
        return view('admin.videos.add',\compact('categories'));
    }

    public function postAdd(Request $request)
    {
        $data = $request->all();
        unset($data['_token']);
        $time = date('Y-m-d H:i:s');
        $data['created_at'] = $time;
        $data['updated_at'] = $time;
        DB::table('videos')->insert($data);
        return redirect()->back();
    }

    public function getDetail($id)
    {
        $video = DB::table('videos')->where('id',$id)->first();
        return view('client.home.detail',\compact('video'));
    }
}
