<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectController extends Controller
{
    public function redirect() {

        $userType = Auth::user()->user_type;

        if ($userType == 1) {
            return view('admin.index');
        }
        else {

            return view('user.index');
        }
    }
}
