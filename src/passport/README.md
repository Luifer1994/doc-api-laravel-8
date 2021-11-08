# Instalación y configuración de Passport

Laravel [Passport](https://laravel.com/docs/8.x/passport#introduction) proporciona una implementación completa del servidor OAuth2 para su aplicación Laravel en cuestión de minutos. Passport está construido sobre el servidor League OAuth2 mantenido por Andy Millington y Simon Hamp.

### Instalación
Para comenzar, instale Passport a través del administrador de paquetes Composer:
```
composer require laravel/passport
```

El proveedor de servicios de Passport registra su propio directorio de migración de base de datos, por lo que debe migrar su base de datos después de instalar el paquete. Las migraciones de Passport crearán las tablas que su aplicación necesita para almacenar clientes OAuth2 y tokens de acceso:

```
php artisan migrate
```
A continuación, debe ejecutar el passport:install comando Artisan. Este comando creará las claves de cifrado necesarias para generar tokens de acceso seguro. Además, el comando creará clientes de "acceso personal" y "concesión de contraseña" que se utilizarán para generar tokens de acceso:

```
php artisan passport:install
```
Después de ejecutar el passport:install comando, agregue el <b>Laravel\Passport\HasApiTokens</b> rasgo a su <b>App\Models\UserModel</b>. Este rasgo proporcionará algunos métodos auxiliares a su modelo que le permitirán inspeccionar el token y los alcances del usuario autenticado:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```
A continuación, debe llamar al Passport::routes método dentro del boot método de su <b>App\Providers\AuthServiceProvider</b>. Este método registrará las rutas necesarias para emitir tokens de acceso y revocar tokens de acceso, clientes y tokens de acceso personal:

```php
 public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
    }
```
No olvides importar la clase Passport en el <b>AuthServiceProvider</b>:
```php
use Laravel\Passport\Passport;
```
Finalmente, en el <b>config/auth.php</b> archivo de configuración de su aplicación , debe establecer la driveropción de la apiprotección de autenticación en passport. Esto le indicará a su aplicación que use Passport TokenGuardal autenticar solicitudes de API entrantes:
```
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```
Listo con esto ya tenemos Passport configurado y listo para generar Tokens de accesos.