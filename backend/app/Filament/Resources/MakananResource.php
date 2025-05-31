<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MakananResource\Pages;
use App\Filament\Resources\MakananResource\RelationManagers;
use App\Models\Makanan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class MakananResource extends Resource
{
    protected static ?string $model = Makanan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('nama_makanan')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('harga')
                    ->required()
                    ->maxLength(255)
                    ->prefix('Rp'),
                Forms\Components\FileUpload::make('gambar')
                    ->image()
                    ->disk('public')
                    ->required(),
                Forms\Components\TextInput::make('energi')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('protein')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('karbohidrat')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('gula')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('lemak')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('garam')
                    ->required()
                    ->numeric(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_makanan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('harga')
                    ->money('idr')
                    ->sortable(),
                Tables\Columns\ImageColumn::make('gambar')
                    ->disk('public')
                    ->width(100) 
                    ->height(100) 
                    ->square()
                    ->defaultImageUrl(url('/images/placeholder.png'))
                    ->extraImgAttributes(['loading' => 'lazy']),
                Tables\Columns\TextColumn::make('energi')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('protein')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('karbohidrat')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('gula')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('lemak')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('garam')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMakanans::route('/'),
            'create' => Pages\CreateMakanan::route('/create'),
            'view' => Pages\ViewMakanan::route('/{record}'),
            'edit' => Pages\EditMakanan::route('/{record}/edit'),
        ];
    }
}
