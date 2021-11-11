# Registrar, Actualizar y Eliminar Géneros

### Registrar

Para registrar un nuevo género crearemos una nueva ruta en nuestro [***grupo de rutas protegidas***](/rutas-protegidas/) que apunte al método **store** del controlador ***GenderController*** y de tipo POST:
```php
Route::post('/genders/add', [GenderController::class, 'store']);//Registrar
```
Ahora configuraremos el método store de ***GenderController*** de la siguinte manera:
```php
public function store(Request $request)
    {
        //Regla de validación
        $rules = [
             'name' => 'required|string|max:15'
        ];
        //Usamos el Facade Validator para validar nuestra regla respecto a los datos recibidos en Request
        $validator = Validator::make($request->all(), $rules);
        //Si falla la validacion retornamos los errores
        if ($validator->fails()) {
            return $validator->errors();
        }
        //Instancia modelo Gender
        $newGender = new Gender;
        //Llevanos el modelo con los datos del Request
        $newGender->name = $request->name;
        //Guardamos
        if ($newGender->save()) {
            return response()->json([
                'message' => 'Registro exitoso',
                'data' => $newGender
            ], 200);
        } else {
            return response()->json([
                'message' => 'Error al guardar el registro',
                'data' => false
            ], 400);
        }
    }
```
No olvides importar el facade Validator en nuestro controlador:
```php
use Illuminate\Support\Facades\Validator;
```
Con esto ya nuestra API está lista para registrar un nuevo género, para registrar un nuevo género mandaremos desde el ciente HTTP un JSON con una llave ***name*** y el valor será el nombre del género a registrar a la ruta creada:

<a href="/doc-api-laravel-8/img/registro-genero.png" target="blank"><img :src="$withBase('/img/registro-genero.png')"></a> 
Ahora si listamos nuestros géneros vemos que ya tenemos el nuevo registro:

<a href="/doc-api-laravel-8/img/listar-nuevo-genero.png" target="blank"><img :src="$withBase('/img/listar-nuevo-genero.png')"></a> 

### Actualizar
Para actualizar un género existente crearemos una nueva ruta en nuestro [***grupo de rutas protegidas***](/rutas-protegidas/) que apunte al método **update** del controlador ***GenderController*** pasando como parámetro el id del género a actualizar, esta ruta será de tipo **PUT**:
```php
 Route::put('/genders/update/{id}', [GenderController::class, 'update']);//Actualizar
```
Nuestro método update dentro del controlador quedará de la siguiente manera:
```php
public function update(Request $request, $id)
    {
        //Regla de validación
        $rules = [
             'name' => 'required|string|max:15'
        ];
        //Usamos el Facade Validator para validar nuestra regla respecto a los datos recibidos en Request
        $validator = Validator::make($request->all(), $rules);
        //Si falla la validacion retornamos los errores
        if ($validator->fails()) {
            return $validator->errors();
        }
        //buscamos el género con el id enviado por la URL
        $gender = Gender::find($id);

        if ($gender) {
            //Cambiamos el nombre del género con el valor enviado por Request
            $gender->name = $request->name;
            //Actualizamos y retornamos el género con el nuevo valor
            if ($gender->update()) {
                return response()->json([
                    'message' => 'Registro actualizado con exito',
                    'data' => $gender
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Error al actualizar el registro',
                    'data' => false
                ], 400);
            }
        } else {
            return response()->json([
                'message' => 'EL género no existe',
                'data' => false
            ], 400);
        }
    }
```
Para actualizar un género, consumimos este EndPoint desde el cliente HTTP y pasamos por URL el id del género a actualizar y por JSON el nuevo valor de la siguiente manera:

<a href="/doc-api-laravel-8/img/genero-editado.png" target="blank"><img :src="$withBase('/img/genero-editado.png')"></a>
Si listamos nuestros géneros vemos el cambio.

### Eliminar
Para eliminar un género, crearemos una nueva ruta en nuestro [***grupo de rutas protegidas***](/rutas-protegidas/) que apunte al método **destroy** del controlador ***GenderController*** pasando como parámetro el id del género a eliminar, esta ruta sera de tipo **DELETE**:

```PHP
 Route::delete('/genders/delete/{id}', [GenderController::class, 'destroy']);//Eliminar
```
Nuestro método destroy quedará de la siguiente manera:
```php
public function destroy($id)
    {
        //buscamos el género con el id enviado por la URL
        $gender = Gender::find($id);
        if ($gender) {
            //Buscamos si hay Macotas relacionadas con este Género
            $pet = Pet::where('id_gender', $gender->id)->get();
            //Si no encontramos mascotas borramos, de lo contrario no
            if ($pet->count() < 1) {
                if ($gender->delete()) {
                    return response()->json([
                        'message' => 'Registro eliminado con exito',
                        'data' => $gender
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'Error al eliminar el registro',
                        'data' => false
                    ], 400);
                }
            } else {
                return response()->json([
                    'message' => 'No se puede eiliminar el registro existen mascotas con este género asignado',
                    'data' => false
                ], 400);
            }
        } else {
            return response()->json([
                'message' => 'EL genero no existe',
                'data' => false
            ], 400);
        }
    }
```

No olvides agregar el modelo de Pet:

```php
use App\Models\Pet;
```



Para borrar solo sería mandar el id por URL del género a borrar a la ruta encargada por el metodo **DELETE**:

<a href="/doc-api-laravel-8/img/borrando-genero.png" target="blank"><img :src="$withBase('/img/borrando-genero.png')"></a>

Al finalizar este capítulo nuestro grupo de rutas debe quedar de la siguiente manera:

```php
Route::group(['middleware' => 'auth:api'], function () {
    //Cerrar sesión
    Route::post('/logout', [UserController::class, 'logout']);
    //Rutas géneros
    Route::get('/genders', [GenderController::class, 'index']);//Listar
    Route::post('/genders/add', [GenderController::class, 'store']);//Registrar
    Route::put('/genders/update/{id}', [GenderController::class, 'update']);//Actualizar
    Route::delete('/genders/delete/{id}', [GenderController::class, 'destroy']);//Eliminar
});
```


<p style="background-color: coral; border-radius: 25px; padding:10px">NOTA: Recuerda que todas estas rutas son protegidas, y no podrás acceder a ellas sin enviar un token válido</p>
<p style="font-size:50px">Onfire🔥</p>