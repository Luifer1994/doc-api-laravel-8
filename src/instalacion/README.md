# Instalación

Lo primero que necesitamos instalar es [Composer](https://getcomposer.org/), una vez instalado Composer vamos a necesitar un gestor de bases de datos MySql para ello instalaremos [XAMPP](https://www.apachefriends.org/es/index.html) que nos ofrece Apache + MariaDB + PHP una vez instalado XAMPP procedemos a crear nuestra apliación [Laravel](https://laravel.com/docs/8.x).

Tenemos 2 formas de crear nuestra aplicación con Composer.
#### 1. Instalación directa con composer con el siguiente comando:
<p style="font-family: Verdana; font-size:14pt; color:black">
    composer create-project laravel/laravel mi-api
</p>

#### 2.Instalación vía instalador de Laravel (CLI):
<p style="font-family: Verdana; font-size:14pt; color:black">
    composer global require laravel/installer
</p>
<p style="font-family: Verdana; font-size:14pt; color:black">
    laravel new mi-api
</p>

Con esto ya hemos creado nuestra aplicación Laravel y ya la podemos abrir en nuestro editor de codigos;

<img :src="$withBase('/img/project.png')">

Para comprobar que todo salio bien abrimos la terminar dentro de nuestro proyecto y escribimos:
<p style="font-family: Verdana; font-size:14pt; color:black">
    php artisan serve
</p>
Esto nos levantara un servidor local donde se va estar ejecutanto nuestra aplicación abrimos ese servidor en el navegador y veremos lo siguiente:

<img :src="$withBase('/img/aplicacion.png')">