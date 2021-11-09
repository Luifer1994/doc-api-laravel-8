# Rutas protegidas

### [Middleware](https://laravel.com/docs/8.x/middleware)
El **middleware** proporciona un mecanismo conveniente para inspeccionar y filtrar las solicitudes HTTP que ingresan a su aplicación.

Laravel incluye varios filtros por defecto, uno de ellos es el encargado de realizar la autenticación de los usuarios. Este filtro lo podemos aplicar sobre una ruta, un ***conjunto de rutas*** o sobre un controlador en concreto. Este middleware se encargará de filtrar las peticiones a dichas rutas: en caso de estar logueado y tener permisos de acceso le permitirá continuar con la petición, y en caso de no estar autenticado le restringe el acceso a la ruta:

### [Grupos de ruta](https://laravel.com/docs/8.x/routing#route-groups)
Los grupos de rutas le permiten compartir atributos de ruta, como middleware, en una gran cantidad de rutas sin necesidad de definir esos atributos en cada ruta individual.

Crearemos nuestro grupo de rutas de la siguiente manera aplicando el ***middleware auth:api*** y así todas las rutas dentro de este grupo estarán protegidas:
```php
Route::group(['middleware' => 'auth:api'], function () {
    //Aquí van todas las rutas que queramos proteger
});
```
#### Proteger ruta de listar géneros
La ruta que teníamos ya creada donde listamos los géneros, la meteremos dentro de nuestro grupo de rutas de la siguiente manera:
```php
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/genders', [GenderController::class, 'index']);
});
```
De esta forma, si ahora intentamos consumir esta ruta desde nuestro cliente HTTP sin antes mandar el token de acceso obtenido en el login no nos dejará listar nuestros géneros, todo lo contrario si enviamos un token válido:
### Token no válido o vacío:
<a href="/doc-api-laravel-8/img/error-list-genders.png" target="blank"><img :src="$withBase('/img/error-list-genders.png')"></a>
<p style="background-color: coral; border-radius: 25px; padding:10px">NOTA: Más adelante personalizaremos estos errores o exepciones</p>

### Token válido:

<a href="/doc-api-laravel-8/img/success-list-gedners.png" target="blank"><img :src="$withBase('/img/success-list-genders.png')"></a> 

### Personalizar Exepciones HTTP
Si analizamos la imagen donde el middleware nos niega el acceso a listar los géneros, nos devuelve un error de servidor con el **código 500**, y nos quiere retornar al login, **pero lo ideal es que no devuelva un mensaje con el código correspondiente a no autorizado 401**, para ellos tenemos que persobalizar nuestro [Hendler](https://laravel.com/docs/8.x/errors) archivo encargado de manejar los errores de nuestra aplicación, este archivo se encuentra en el el siguiente directorio ***App\Exceptions\Handler*** remplazamos el código por el siguiente:

```php
<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [];
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];
    public function register()
    {
        $this->renderable(function (Exception $e, $request) {
            return $this->handleException($request, $e);
        });
    }
    public function handleException($request, Exception $exception)
    {
        if ($exception instanceof RouteNotFoundException) {
            return response()->json(["res" => false, "message" => "Error de autenticación"], 401);
        }
        if($exception instanceof HttpException){
            return response()->json(["res" => false, "message" => "Error de ruta"], 404);
        }
        if ($exception instanceof AuthorizationException) {
            return response()->json(["res" => false, "message" => "Error de autorización, no tiene permisos"], 403);
        }
    }
}
```
Ahora, si intentamos consumir el EndPoint que lista nuestros géneros con un token inválido obtenemos lo siguiente:

<a href="/doc-api-laravel-8/img/ecepciones-personalizadas.png" target="blank"><img :src="$withBase('/img/ecepciones-personalizadas.png')"></a> 

Con esto ya hemos aprendido a proteger nuestras rutas y personalizar las exepciones de nuestra API.
<p style="font-size:50px">😎</p>
