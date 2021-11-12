# CRUD Mascotas
### Listar Mascotas
Para listar grandes cantidades de datos como lo podrián ser nuestro listado de mascotas, por optimización no es conveniente retornar toda la data de golpe, lo mejor sería dividir esa data en pequeños bloques de datos, es hay ahí donde entra en juego la [Paginación](https://laravel.com/docs/8.x/pagination#introduction) de laravel.
#### Paginación
En otros marcos, la paginación puede ser muy dolorosa. Esperamos que el enfoque de Laravel a la paginación sea un soplo de aire fresco. El paginador de Laravel está integrado con el generador de consultas y Eloquent ORM y proporciona una paginación conveniente y fácil de usar de los registros de la base de datos sin configuración.

Hay varias formas de paginar elementos. La más simple es usar el paginate método en el generador de consultas o una consulta Eloquent . El paginate método se encarga automáticamente de establecer el "límite" y el "desplazamiento" de la consulta en función de la página actual que está viendo el usuario. De forma predeterminada, la página actual es detectada por el valor del page argumento de la cadena de consulta en la solicitud HTTP. Laravel detecta automáticamente este valor y también se inserta automáticamente en los enlaces generados por el paginador.

Lo primero será crear el controlador que administre la logica de nuestras mascotas, este controlador lo llamaremos ***PetController*** y sera de tipo API, lo creamos con el siguiente comando:
```
php artisan make:controller PetController --api
```
Luego de creado el controlador que haremos para listar nuestras mascotas paginadas será crear una ruta que reciba un parámetro con el límite que le pasaremos al paginador de laravel, esta ruta apuntara al método ***index*** de ***PetController***:
```php
Route::get('/pets/{limit?}', [PetController::class,'index']);//Listar paginado
```
Ahora configuremos el método index de la siguiente manera:
```php
public function index($limit = null)
{
    //Si mandamos un limit lo asignamos y si no por defecto sera de 5 el paginado
    $limit ? $limit = $limit : $limit = 5;
    //Buscamos las mascotas y hacemos join con las respectivas tablas y retornamos paginado el resultado
    $pets = Pet::select('pets.id', 'pets.name as pet', 'pets.age', 'users.name as user', 'genders.name as gender')
        ->join('users', 'pets.id_user', '=', 'users.id')
        ->join('genders', 'pets.id_gender', '=', 'genders.id')
        ->OrderBy('id', 'desc')->paginate($limit);

    return response()->json([
        'message' => 'ok',
        'data' => $pets,
    ], 200);
}
```
Ahora consumamos este EndPoint desde el cliente HTTP para ver la magia de la paginación, en mi caso le mandare un limit de 2:
<a href="/doc-api-laravel-8/img/list-mascotas.png" target="blank"><img :src="$withBase('/img/list-mascotas.png')"></a>
Como ves en la imagen efectivamente nos retorno solo los 2 registros como le espesificamos en el limit y nos retorno tambien toda la info para armar la paginación en nuestro frontend, como lo es el número de páginas, links, la página en que estamos, el siguiente enlace, el número de registros, etc... 

Para pasar a la siguiente página solo sería agregar el ***page*** a nuestra URL de la siguiente manera [http://127.0.0.1:8000/api/pets/2?page=2](http://127.0.0.1:8000/api/pets/2?page=2):
<a href="/doc-api-laravel-8/img/list-mascotas-page2.png" target="blank"><img :src="$withBase('/img/list-mascotas-page2.png')"></a>
Con esto ya sabemos como paginar con laravel.

### Registrar

#### [API Resource Routes](https://laravel.com/docs/8.x/controllers#api-resource-routes)
El enrutamiento de recursos de laravel asigna las rutas típicas "crud" a un controlador con una sola línea de código. 
Al declarar rutas de recursos que serán consumidas por las API, normalmente querrá excluir rutas que presenten plantillas HTML como createy edit. Por conveniencia, puede utilizar el apiResource método para excluir automáticamente estas dos rutas:
* ***Route::apiResource()*** solo crea rutas para indexar, almacenar, mostrar, actualizar y destruir.
* ***Route::resource()*** también agrega una ruta de creación y edición que no tiene sentido en un contexto de API.

Teniendo claro lo anterior nuestra ruta quedará de la siguiente manera:
```php
 Route::apiResource('/pets', PetController::class);
```
Para ver el listado de rutas creada con el ***apiResource*** ejecutamos el siguiente comando:
```
php artisan route:list
```
Ten en cuanta que varias de las rutas creadas con nuestra ruta de recurso comparten la misma URL lo que cambia es el método ***(GET,POST,PUT,DELETE)***

Nuestro método store lo configuramos así:
```php
 public function store(Request $request)
    {   
        //Regla de validación
        $rules = [
            'name'      =>  'required|string',
            'age'       =>  'required|numeric',
            'gender'    =>  'required|numeric'
        ];
        //Validamos
        $validator = Validator::make($request->all(), $rules);
        //Retorna si falla la validación
        if ($validator->fails()) {
            return $validator->errors();
        }
        //Comprobamos que exista el género enviado
        $gender = Gender::find($request->gender);
        if ($gender) {
            //Instancia al modelo de Mascota
            $newPet = new Pet();
            $newPet->name       = $request->name;
            $newPet->age        = $request->age;
            $newPet->id_gender  = $gender->id;
            $newPet->id_user    = Auth::user()->id;//ID del usuario logeado
            //Guardamos
            if ($newPet->save()) {
                return response()->json([
                    "message" => "Registro exitoso",
                    "data" => $newPet
                ], 200);
            } else {
                return response()->json([
                    "message" => "Error al guardar el registro",
                    "data" => false
                ], 400);
            }
        } else {
            return response()->json([
                "message" => "El género enviado no existe",
                "data" => false
            ], 400);
        }
    }
```
No olvides importar estas clases en el controlador :
```php
use App\Models\Gender;
use App\Models\Pet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
```
Con esto ya podemos registrar masconas:
<a href="/doc-api-laravel-8/img/registro-mascotas.png" target="blank"><img :src="$withBase('/img/registro-mascotas.png')"></a>

### Actualizar
Como ya tenemos la ruta para actualizar creada solo sería configurar el metodo ***update*** de nuestro controlador ***PetController*** de la siguiente manera:
```php
 public function update(Request $request, $id)
    {
        $rules = [
            'name'      =>  'required|string',
            'age'       =>  'required|numeric',
            'gender'    =>  'required|numeric'
        ];
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return $validator->errors();
        }
        //Buscamos la mascota por el ID
        $pet = Pet::find($id);
        //Comprobamos que exista la mascota
        if ($pet) {
            //Buscamos y comprobamo que le género enviado exista
            $gender = Gender::find($request->gender);
            if ($gender) {
                //Remplazamos los datos de la mascota por los enviados por Request
                $pet->name       = $request->name;
                $pet->age        = $request->age;
                $pet->id_gender  = $gender->id;
                //Actualizamos
                if ($pet->update()) {
                    return response()->json([
                        "message" => "Registro actualizado con exito",
                        "data" => $pet
                    ], 200);
                } else {
                    return response()->json([
                        "message" => "Error al actualizar el registro",
                        "data" => false
                    ], 400);
                }
            } else {
                return response()->json([
                    "message" => "El género enviado no existe",
                    "data" => false
                ], 400);
            }
        } else {
            return response()->json([
                "message" => "La mascota no existe",
                "data" => false
            ], 400);
        }
    }
```
Para actualizar una mascota mandamos a por nuestra ruta el ID de la siguiente manera por método ***PUT***   [http://127.0.0.1:8000/api/pets/1](http://127.0.0.1:8000/api/pets/1) y los nuevos valores a cambiar de dicha mascota:
<a href="/doc-api-laravel-8/img/actualizar-mascotas.png" target="blank"><img :src="$withBase('/img/actualizar-mascotas.png')"></a>

### Eliminar
Método ***destroy*** de ***PetController*** :
```php
 public function destroy($id)
    {
        //Buscamos la mascota a elminar por el ID
        $pet = Pet::find($id);
        //Coprobamos que exista la mascota
        if ($pet) {
            //Borramos
            if ($pet->delete()) {
                return response()->json([
                    "message" => "Registro eliminado con exito",
                    "data" => false
                ], 200);
            } else {
                return response()->json([
                    "message" => "Error al eliminar el registro",
                    "data" => false
                ], 400);
            }
        } else {
            return response()->json([
                "message" => "El registro a eliminar no existe",
                "data" => false
            ], 400);
        }
    }
```
Llamamos este EndPoint exactamente con la misma ruta del de actualizar solo cambia el metodo que sera ***DELETE***
<a href="/doc-api-laravel-8/img/borrar-mascotas.png" target="blank"><img :src="$withBase('/img/borrar-mascotas.png')"></a>

Listo con esto hemos terminado el CRUD de mascotas.
<p style="font-size:50px">😎</p>