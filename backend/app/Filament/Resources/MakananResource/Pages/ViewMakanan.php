<?php

namespace App\Filament\Resources\MakananResource\Pages;

use App\Filament\Resources\MakananResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewMakanan extends ViewRecord
{
    protected static string $resource = MakananResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}
