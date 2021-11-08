# Instalación

Lo primero que necesitamos instalar es [Composer](https://getcomposer.org/), una vez instalado Composer vamos a necesitar un gestor de bases de datos MySql, para ello instalaremos [XAMPP](https://www.apachefriends.org/es/index.html) que nos ofrece Apache + MariaDB + PHP, una vez instalado XAMPP procedemos a crear nuestra apliación [Laravel](https://laravel.com/docs/8.x).

Tenemos 2 formas de crear nuestra aplicación con Composer.
#### 1. Instalación directa con composer con el siguiente comando:
```
    composer create-project laravel/laravel mi-api
```

#### 2.Instalación vía instalador de Laravel (CLI):
```
    composer global require laravel/installer
```
```
    laravel new mi-api
```


Con esto, ya hemos creado nuestra aplicación Laravel y ya la podemos abrir en nuestro editor de códigos;

<a href="/doc-api-laravel-8/img/project.png" target="blank"><img :src="$withBase('/img/project.png')"></a>

Para comprobar que todo salio bien, abrimos la terminal dentro de nuestro proyecto y escribimos:
```
    php artisan serve
```
Esto nos levantará un servidor local donde se va estar ejecutanto nuestra aplicación, abrimos ese servidor en el navegador y veremos lo siguiente:

<a href="/doc-api-laravel-8/img/aplicacion.png" target="blank"><img :src="$withBase('/img/aplicacion.png')"></a>