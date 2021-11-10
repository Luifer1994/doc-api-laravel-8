# Seeders, Factories y Faker

### ¿Qué son los seeders?

Los seeders no son más que componentes del framework Laravel que sirven para inicializar las tablas con datos. Así como las migraciones nos permiten especificar el esquema de la base de datos, los seeders nos permiten también por medio de código alimentar las tablas con datos.

Una seeder sólo contiene un método por defecto: **run**. Este método se llama cuando se ejecuta el **db:seed** comando Artisan. Dentro del runmétodo, puede insertar datos en su base de datos como desee. Puede usar el generador de consultas para insertar datos manualmente o puede usar las fábricas de modelos Eloquent.

#### Ejemplo:

Modifiquemos la DatabaseSeederclase predeterminada y agreguemos una declaración de inserción de base de datos al runmétodo:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeders.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
```

Con el codigo anterior si corremos el comando artisan

```
php artisan migrate:fresh --seed
```
Esto nos creará un nuevo usuario en la base de datos.

### Factories

Por supuesto, especificar manualmente los atributos para cada seeder de modelo es engorroso. En su lugar, puede utilizar los factories para generar de forma conveniente grandes cantidades de registros de bases de datos. Primero, revise la [documentación](https://laravel.com/docs/8.x/database-testing#defining-model-factories) de los factories para aprender cómo definir sus factories.

Para ver un ejemplo de cómo escribir un factory, eche un vistazo al <b>database/factories/UserFactory.php</b> archivo en su aplicación. Este factory se incluye con todas las nuevas aplicaciones de Laravel y contiene la siguiente definición:

```php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
 
```

Como puede ver, en su forma más básica, las fábricas son clases que extienden la clase de fábrica base de Laravel y definen el definitionmétodo. El definitionmétodo devuelve el conjunto predeterminado de valores de atributo que se deben aplicar al crear un modelo utilizando la fábrica.

A través de la faker propiedad, los factories tienen acceso a la biblioteca PHP de [Faker](https://fakerphp.github.io/), que le permite generar convenientemente varios tipos de datos aleatorios para realizar pruebas.

### Creando Usuario, Mascotas y Generos con Factory

En los capítulos anteriores cuando creamos nuestro modelos tambien habíamos creado el factory de cada uno de ellos, ahora configuremos estas clases para llenar nuestra base de datos.

#### UserFactory
Este factory ya viene por defecto en Laravel, pero nosotros modificaremos sun datos para crear un usuario personalizado, nuestro método definition quedara de la siguiente manera:

```php
 public function definition()
    {
        return [
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
```
#### GenderFactory

```php
 public function definition()
    {
        return [
           'name' => $this->faker->randomElement(['Masculino', 'Femenino'])
        ];
    }
```
#### PetFactory

```php
public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'age'  => $this->faker->randomNumber([5, 40]),
            'id_gender' => $this->faker->numberBetween(1,2),
            'id_user' => 1
        ];
    }
```

Ya hemos llenado los datos de nuestro Factory ahora paseremos a llamarlos desde nuestro seeder para crear los registros; Dentro del DatabaseSeeder en el metodo run escribiremos los siguiente:

```php
 public function run()
    {
        //el numero es la cantidad a crear
         \App\Models\User::factory(1)->create();
         \App\Models\Gender::factory(2)->create();
         \App\Models\Pet::factory(20)->create();
    }
```
Por último, corramos de nuevo nuestras migraciones junto con los seeders y luego revisemos las tablas de la base de datos, y ya estarán 1 usuario, 2 generos y 20 mascotas.

```
php artisan migrate:fresh --seed
```