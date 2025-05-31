<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Makanan;
use Illuminate\Http\Request;

class MakananController extends Controller
{
    public function index()
    {
        $makanan = Makanan::all();
        return response()->json([
            'success' => true,
            'data' => $makanan
        ]);
    }

    public function show($id)
    {
        $makanan = Makanan::find($id);
        if (!$makanan) {
            return response()->json([
                'success' => false,
                'message' => 'Makanan tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $makanan
        ]);
    }
}