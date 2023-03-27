<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
// use RealRashid\SweetAlert\Facades\Alert;

class MessageController extends Controller
{
    public function message (Request $request) {

        $message = New Message();

        $message->name = $request->name;
        $message->email = $request->email;
        $message->phone = $request->phone;
        $message->subject = $request->subject;
        $message->message = $request->message;

        $message -> save();

        // Alert::success('Message sent successfully', 'success');
        

        return redirect()->back();

    }
}
