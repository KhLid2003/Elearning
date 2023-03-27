<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    
    public function messages()
    {
        return view('admin.messages', ['messages' => Message::all()]);
    }


    public function clients()
    {
        return view('admin.clients', ['clients' => User::all()]);
    }


    public function messageShow($message)
    {

        return view('admin.messageShow', [
            'message' => Message::findOrFail($message)
        ]);


    }


    public function messageDestroy($message)
    {

        $delete = Message::findOrFail($message);
        $delete -> delete();

        return redirect()->back();


    }

    
    // public function create()
    // {
    //     //
    // }

    
    // public function store(Request $request)
    // {
    //     //
    // }

    // public function show($id)
    // {
    //     //
    // }

    // public function edit($id)
    // {
    //     //
    // }

    // public function update(Request $request, $id)
    // {
    //     //
    // }

    // public function destroy($id)
    // {
    //     //
    // }
}
