# EJS (Embedded JavaScript) Notları

## EJS Nedir?

EJS, Express uygulamalarında server-side rendering yapmak için kullanılan bir template engine'dir.

Amaç:

* Backend'den gelen verileri HTML içine yerleştirmek
* Dinamik sayfalar oluşturmak
* Browser'a hazır HTML göndermek

Örnek:

```js
res.render("index", {
  username: "Musa"
});
```

```ejs
<h1>Merhaba <%= username %></h1>
```

Çıktı:

```html
<h1>Merhaba Musa</h1>
```

---

# REST API vs EJS (View)

## REST API

Backend JSON döndürür.

```js
res.send({
  error: false,
  data
});
```

Kullanım:

* React
* Vue
* Angular
* Mobil uygulamalar
* Postman

---

## EJS (View)

Backend HTML döndürür.

```js
res.render("index", {
  data
});
```

Kullanım:

* Admin panel
* Dashboard
* Landing page
* Server Side Rendering

---

# Aynı Projede REST API + EJS

Aynı backend hem API hem de View sağlayabilir.

Örnek:

```txt
/api/todos
/view
```

API:

```js
res.send(data);
```

View:

```js
res.render("index", {
  data
});
```

---

# Controller Mantığı

Business logic her zaman controller içinde kalır.

Yanlış düşünce:

```txt
API Controller -> İşlem yapar
View Controller -> Sadece gösterir
```

Doğru düşünce:

```txt
API Controller -> İşlem yapar + JSON döndürür
View Controller -> İşlem yapar + HTML döndürür
```

Örnek:

```js
const data = await Todo.findAll();
```

Bu kod her iki controller içinde de olabilir.

Fark sadece response kısmıdır.

```js
res.send(data);
```

veya

```js
res.render("index", {
  data
});
```

---

# View Klasörü Değiştirme

Varsayılan:

```txt
/views
```

Değiştirme:

```js
app.set("views", "public");
```

Artık Express şurada arar:

```txt
/public
```

---

# EJS Tagleri

## JavaScript Çalıştır

```ejs
<% code %>
```

Örnek:

```ejs
<% if(user) { %>
```

---

## Safe Print

```ejs
<%= value %>
```

HTML escape edilir.

Örnek:

```ejs
<%= username %>
```

---

## Direct Print

```ejs
<%- value %>
```

HTML escape edilmez.

Örnek:

```ejs
<%- "<span>Yes</span>" %>
```

---

## Comment

```ejs
<%# comment %>
```

Render edilmez.

---

## EJS Karakterlerini Yazdır

```ejs
<%% %>
```

Çıktı:

```txt
<%
```

---

# EJS Döngü

```ejs
<% todos.forEach(todo => { %>

<tr>
  <td><%= todo.title %></td>
</tr>

<% }) %>
```

---

# Ternary Kullanımı

```ejs
<%- todo.isDone
    ? "<span class=\"text-success\">Yes</span>"
    : "<span class=\"text-danger\">No</span>"
%>
```

HTML ürettiği için direct print kullanılır.

---

# Tarih Formatlama

```ejs
<%= todo.createdAt.toLocaleDateString("tr-TR") %>
```

---

# Bootstrap

## Input

```html
<input class="form-control">
```

---

## Select

```html
<select class="form-select">
```

---

## Button

```html
<button class="btn btn-primary">
```

---

## Table

```html
<table class="table table-striped">
```

---

## Uzun Yazıyı Kısaltma

```html
<td
  class="text-truncate"
  style="max-width:200px"
>
```

---

# Delete İşlemi

Browser'da DELETE metodu kullanılamadığı için:

```txt
/view/:id/delete
```

şeklinde GET route kullanıldı.

Route:

```js
router.get("/:id/delete", todo.delete);
```

Button:

```ejs
<button
onclick="
if(confirm('Are you sure?'))
window.location.href='/view/<%= todo.id %>/delete'
">
Delete
</button>
```

---

# Create Akışı

1. Kullanıcı Create'e tıklar
2. GET isteği gider
3. Form sayfası açılır
4. Kullanıcı verileri doldurur
5. POST isteği gönderilir
6. Veri DB'ye kaydedilir
7. Listeye yönlendirilir

Akış:

```txt
GET /view/create
↓
Form göster
↓
POST /view/create
↓
Kaydet
↓
Redirect /view
```

---

# GET ve POST Aynı Path Kullanabilir

```js
router.get("/create", todo.createPage);
router.post("/create", todo.create);
```

GET:

```txt
Formu göster
```

POST:

```txt
Formu kaydet
```

Method farklı olduğu için çakışmaz.

---

# Form Yapısı

```ejs
<form action="/view/create" method="POST">
```

Önemli:

```html
name="title"
name="description"
name="priority"
```

Bu alanlar:

```js
req.body
```

içerisinde gelir.

---

# Bu Dersten Çıkan En Önemli Sonuç

EJS kullanınca controller mantığı değişmez.

Sadece:

```js
res.send()
```

yerine

```js
res.render()
```

veya

```js
res.redirect()
```

kullanılır.

Business logic yine controller içerisinde kalır.
