# Modelos y Migraciones

### Modelo
El modelo es la parte del patron [MVC](https://www.adaweb.es/modelo-vista-controlador-mvc-php/) que nos permite la comunicación con las tablas de nuestra base de datos a través de su clase

### Migración
Se dice que las migraciones son un control de versiones de nuestra base de datos, pero en realidad son más que eso. Este nos permite crear tablas, establecer relaciones, modificarlas y por supuesto eliminarlas, y todo esto mediante la consola de comandos.

A continuación te mostraré el diseño de nuestra base de datos por medio del siguiente diagrama:

<img style="width:400px" :src="$withBase('/img/diagrama.png')">

Cabe resaltar que al crear nuestras migraciones debemos seguir un orden teniendo en cuenta nuestro modelo de base de datos, no podemos crear una migración que hace referencia a una tabla debíl sin antes haber creado la tabla fuerte. Ejemplo, viendo nuestro diagrama nos damos cuenta que la tabla géneros sería la tabla fuerte con respecto a la tabla mascotas, por lo tanto no podriamos crear primero la migración mascotas si no existe antes la de géneros, ya que al momento de establecer la relación nos dará error.

#### Crear modelos migraciones y factory.
El modelo usuario ya está creado por defecto con la instalación de laravel, crearemos el de mascotas y generos.

Con el siguiente comando crearemos de un tiro el modelo, la migración y el factory de géneros.

```
php artisan make:model Gender -mf
```
<p style="background-color: coral; border-radius: 25px; padding:10px">Nota: Por convención los modelos deben crearse en singular y laravel es tan inteligente que al momento de crear nuestra tabla dentro de la migración se generará en prural</p>

El comando anterior nos generó 3 archivos dentro de nuestro proyecto, el modelo lo encontraremos en el directorio <b>app/Models/Gender.php</b>, el factory en <b>database/factories/GenderFactory.php</b> y la migracion <b>database/migrations/2021_11_04_040728_create_genders_table.php</b>

#### Creando campos de nuestra migración.
Abriremos el archivo de migración generado y dentro de la funcion up configuramos nuestro Schema de la siguiente forma:
```php
Schema::create('genders', function (Blueprint $table) {
    $table->id();// Este campo es la llave primaria y será auto incrementable
    $table->string('name',15);//con el numero le espesificamos el tamaño del campo
    $table->timestamps();
});
```
Así como estamos asigando al campo name el tipo string hay muchos más tipos, para ver la lista completa entremos [AQUÍ](https://laravel.com/docs/8.x/migrations#available-column-types)

Procederemos con la creación del modelo, migración y factory de mascotas

```
php artisan make:model Pet -mf
```
Esta será la configuración de nuestra migración de mascotas
```php
Schema::create('pets', function (Blueprint $table) {
    $table->id();
    $table->string('name', 100);
    $table->integer('age');
    $table->foreignId('id_gender')->constrained('genders');//Relación con géneros
    $table->foreignId('id_user')->constrained('users');//Relación con usuarios
    $table->timestamps();
});

```
#### Ejecutar migraciones
Despues de haber configurado nuestras tablas en las migraciones, ejecutaremos las migraciones para que se nos creen todas las tablas con sus respectivos campos y relaciones con el siguiente comando.
```
php artisan migrate
```
Si vamos a nuestra base de datos nos daremos cuenta qué ya no está vacía.