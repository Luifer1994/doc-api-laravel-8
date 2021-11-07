# Controladores y Rutas

### Controladores
Los controladores son un mecanismo que nos permite agrupar la lógica de peticiones HTTP relacionadas y de esta forma organizar mejor nuestro código.

En lugar de definir toda la lógica para la gestión de una petición dentro de Closures o funciones anónimas en los archivos de rutas, se puede organizar este comportamiento en unas clases llamadas Controladores (controllers). Los controladores pueden agrupar la lógica de gestión de peticiones relacionadas en una única clase. Estos controladores se encuentran normalmente en el directorio app/Http/Controllers.

#### GenderController

Crearemos un controlador para todas las solicitudes HTTP relacionadas al modelo de Generos, para ello Laravel nos ofrece el siguiente comando artisan:

```
php artisan make:controller GenderController --api
```
agregando el --api nos creara nuestro controlador con todos los metodos necesarios para usar en un CRUD API.

Ahora abrimos nuestro controlador:
```php
<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class GenderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

```
### Listar géneros

Ahora configuremos nuestro contrador para listar nuestros generos, para eso utilizaremos el metodo index de nuestro controlador:
```php
public function index()
    {
        $genders = Gender::all();
        return response()->json([
            'message' => 'OK',
            'data' => $genders,
        ],200);
    }
```
No olvides importar el modelo en nuestro controlador
```php
use App\Models\Gender;
```

### Rutas
Las rutas de Laravel más básicas aceptan un URI y un cierre, proporcionando un método muy simple y expresivo para definir rutas y comportamientos sin complicados archivos de configuración de enrutamiento.

Crearemos nuestra primer ruta para listar los géneros:
```php
Route::get('/genders', [GenderController::class, 'index']);
```
No olvides importar el controlador en nuestro archivo de rutas:
```php
use App\Http\Controllers\GenderController;
```
Ahora si accedemos en el navegador el siguiente enlase obtenemos todos los generos:
[http://127.0.0.1:8000/api/genders](http://127.0.0.1:8000/api/genders)

<img :src="$withBase('/img/get-generos.png')" style="width:auto">
