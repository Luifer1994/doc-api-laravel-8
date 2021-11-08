# Login
En el paso anterior hemos configurado passport, entonces sólo hace falta crear un controlador para administrar los accesos a nuestra API.
Crearemos un nuevo controlador que se llamdará <b>UserController</b>:
```
php artisan make:controller UserController
```
### Método Login

Dentro del controlador creado configuramos un metodo llamado Login el cual nos devolverá el token del usuario cuando se logea con las credenciales correctas:

```php
public function login(Request $request)
    {
        $rules = array(
            'email' => 'required|email',
            'password' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $user = User::whereEmail($request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('Laravel')->accessToken;
            return response()->json([
                'res' => true,
                'token' => $token,
                'message' => 'Bienvenido al sistema',
            ], 200);
        } else {
            return response()->json([
                'res' => false,
                'message' => 'Email o password incorrecto',
            ], 400);
        }
    }
```
No olvides importar estas clases dentro de nuestro controlador:
```php
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
```
### Ruta login
Necesitamos una ruta para acceder al método login de nuestro controlador, en el archivo de rutas de nuestra API creamos la siguiente ruta:
```php
Route::post('/login', [UserController::class, 'login']);
```
No olvides importar el controlador dentro del archivo de rutas:
```php
use App\Http\Controllers\UserController;
```
Ahora necesitaremos un cliente HTTP que nos permita probar nuestra API, podemos usar cualquiera yo recomiendo [Insomnia](https://insomnia.rest/download); Si mandamos las credenciales de nuestro usuario por medio de [Insomnia](https://insomnia.rest/download) o [Postman](https://www.postman.com/) a la ruta login obtenemos lo siguiente:

<img :src="$withBase('/img/login.png')">

Si vemos la imagen ya tenemos nuestro token el cual usaremos para acceder a rutas protegidas.
<p style="font-size:50px">Genial 👨‍💻🤩</p>