# Conxión y configuración Base de datos 

### Creacióncon de base de datos
Lo primero que necesitamos es inicializar XAMPP para ello abrimos la aplicación instalada en el capitulo anterior y iniciamos apche y mysql:

<img :src="$withBase('/img/xampp.jpg')">

Una vez inicializado estos 2 servicios procederemos a crear nuestra base de datos ingresamos a la 
URL: [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/)

<img :src="$withBase('/img/phpmyadmin.png')">

Ahora creamos una nueva base de datos vacia con el nombre que ustedes quieran.

<img :src="$withBase('/img/crea_base_datos.jpg')">

### Conexión con la base de datos

Para establecer la conexión con nuesra base de datos es muy facil basta con ubicar el archivo que se crea por defectocon la instalacion de laravel que esta en la raiz del proyecto llamado  <b>.env</b> 

Si no se te creo ese archivo debe haber uno llamado <b>.env.example</b> el cual le cambiaremos el nombre a solo .env

Abrimos el archivo y ubicamos la parte donde esta la conexión y colocaremos la información de nuestra base de datos:

<img :src="$withBase('/img/conexion_bs.png')">

<p style="background-color: coral; border-radius: 25px; padding:10px">NOTA: Cuando instalamos XAMPP y corremos mysql el usuario por defecto es root y no tiene contraseña como se ve en la imagen</p>

Listo ya tenemos nuestra base de datos conectada a nuestro proyecto.


