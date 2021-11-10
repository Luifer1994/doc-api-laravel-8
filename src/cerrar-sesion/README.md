# Cerrar sesión
Para cerrar sesión solo basta con destruir el token generado con passport de nuestra API, para ello crearemos una nueva función en el controlador ***UserController*** la cual se llamará ***logout***, en le cual buscaremos los tokens que pertenecen al usuario logeado y destruirlos: 

```php
 public function logout()
    {
        //Obtenemos usuario logeado
        $user = Auth::user();
        //Busca todos los token del usuario en la base de datos y los eliminamos;
        $user->tokens->each(function($token){
           $token->delete();
        });
        return response()->json([
            'res' => true,
            'message'=> 'Hasta la vista Baby',
        ],200);
    }
```

Recuerda colocar  la clase de autenticación:

```php
use Illuminate\Support\Facades\Auth;
```

### Ruta logout
Ahora crearemos una ruta la cual llame a esta función de nuestro controlador, esta ruta también será protegida, ya que no podemos cerrar sesión si no existe ninguna sesión activa:

```php
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/genders', [GenderController::class, 'index']);
});
```
Si consumimos este EndPoint desde el cliente HTTP y le mandamos un token válido, destruirá nuestra sesión:

<a href="/doc-api-laravel-8/img/logout.png" target="blank"><img :src="$withBase('/img/logout.png')"></a> 
Con esto, hemos destruido la sesión e invalidado los tokens anteriores pertenecientes al usuario; Ahora intenta listar los géneros con el token que cerramos sesión y veras los que pasa. 😉