<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class makanan extends Model
{
    //protected $table = 'makanans';
    protected $fillable = ['nama_makanan', 'harga', 'gambar', 'energi', 'protein', 'karbohidrat', 'gula', 'lemak', 'garam'];
    
}
