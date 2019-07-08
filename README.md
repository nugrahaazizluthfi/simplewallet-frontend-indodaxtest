### TECH

Aplikasi ini dibangun menggunakan:

|   Tech   | Version |
| :------: | :-----: |
| React JS | 16.8.6  |
|   NPM    |  6.4.1  |

### INSTALASI

Untuk langkah pertama ketikan perintah berikut pada command line anda:

```sh
$ git clone https://github.com/nugrahaazizluthfi/clientapp.git
```

setelah itu lalu ketikan ini di command line anda:

```sh
$ cd clientapp
$ npm install
```

copy rename .env.example menjadi .env dengan perintah berikut:

```sh
$ copy .env.example .env
```

Isi variable REACT_APP_API_URL pada file .env di folder client kamu dengan alamat ini:

-   http://localhost/restapp/public/api/

Setelah selesai anda dapat mengaktifkan server node anda atau membuild file anda terlebih dahulu, dengan menjalankan perintah:

RUN SERVER

```sh
$ npm run start
```

ini dapat diakses langsung pada browser dengan mengakses URL ini: http://localhost:3000/ (\*port default 3000)

RUN BUILD

```sh
$ npm run start
```

ini akan mengenerate file yang terkompres pada folder build, anda dapat memindahkan isi folder build pada webserver anda dan mengaksesnya (\*react default hanya menerima alamat yang sudah memiliki ssl)

Untuk login anda bisa menggunakan User Account ini:

|     Email     | Password |
| :-----------: | :------: |
| demoa@demo.id |  123456  |
| demob@demo.id |  123456  |
