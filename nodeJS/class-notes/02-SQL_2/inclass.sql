-- Active: 1775635611108@@127.0.0.1@3306

-- * VS CODE EXTANTION:
-- https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2

-- * Fonksiyonlar: MIN, MAX, AVG, SUM, ROUND, LENGTH (Tek değer döndüren fonksiyonlar)(SELECT ile FROM arasina yazilir)

SELECT * FROM Invoice;

-- ? toplam fatura miktrarini bulalim
SELECT SUM(Total) AS toplamFaturaTutari FROM Invoice;

-- ? En dusuk, en yuksek ve ortalama fatura miktarlarini getir
SELECT 
    MIN(Total) AS minFatura,
    MAX(Total) AS maxFatura,
    ROUND(AVG(Total), 2) AS avgFatura
FROM 'Invoice';


-- ? Fatura adres uzulunlarini listele
SELECT length(BillingAddress) FROM "Invoice";

-- ? AC/DC grubunun en kisa surede calan parcasini liste
SELECT * 
FROM "Track" 
WHERE "Composer" = 'AC/DC' 
ORDER BY "Milliseconds" ASC
LIMIT 1;

--v2 En kısa süreli parçayı MIN fonksiyonu ile bulma
SELECT min(Milliseconds), * FROM "Track" WHERE "Composer" = 'AC/DC';

-- ? AC/DC grubunun en UZUN surede calan parcasini liste
SELECT * 
FROM "Track" 
WHERE "Composer" = 'AC/DC' 
ORDER BY "Milliseconds" DESC
LIMIT 1;

--v2 En uzun süreli parçayı MAX fonksiyonu ile bulma
SELECT max(Milliseconds), * FROM "Track" WHERE "Composer" = 'AC/DC';


-- * GROUP BY: Verileri gruplama

-- ? Faturalari ulkeye gore gruplama
SELECT * from "Invoice" GROUP BY "BillingCountry"

-- ? her bir ulke icin kesilenortalam fatura miktarlarini getir
SELECT "BillingCountry", round(avg("Total"), 2) AS 'Avg Bill' from "Invoice" GROUP BY "BillingCountry"

-- ? Hangi ülkeye kaç adet fatura kesildi (COUNT)
SELECT
    BillingCountry,
    COUNT("InvoiceId") AS 'Toplam Fatura Sayisi'
FROM Invoice
GROUP BY BillingCountry;

-- ? ulkeye gore toplam adet ve tutarlari getir
SELECT
    BillingCountry,
    COUNT("InvoiceId") 'Toplam Fatura Sayisi',
    SUM(Total) 'Totalbill'
FROM Invoice
GROUP BY BillingCountry
ORDER BY Totalbill;

-- ? Ülkeye göre min/max fatura tutarı
SELECT BillingCountry, min(Total) 'min', max(Total) 'max'
FROM "Invoice"
GROUP BY "BillingCountry";

-- * HAVING: GROUP BY ile birlikte koşul kullanma

-- ? Toplma fatura tutari 100'den fazla olan ulkeleri listele
SELECT BillingCountry, sum(Total) 'Total bill'
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING sum(total) > 100;

-- ? 7'ten fazla fatura kesilen ülkeleri listele
SELECT BillingCountry, count("InvoiceId") AS FaturaSayisi
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING COUNT(InvoiceId) > 7
ORDER BY FaturaSayisi;

-- ? Ortalam fatura tutari 'den buyuk olan ulkeleri listele
SELECT BillingCountry, round(avg(Total), 2) ortlamaFatura
FROM "Invoice"
GROUP BY "BillingCountry"
HAVING avg(Total) > 6;


-- * SUBQUERY: Ic ice sorgular kullanma

-- ? ortalma fatura miktarlarini hesaplama
SELECT round(avg(Total), 2)
FROM "Invoice"

-- ? oratalama fatura miktarindan yuksek olan faturalri listeleme
SELECT * 
FROM "Invoice"
WHERE Total > 5.65;

SELECT * 
FROM "Invoice"
WHERE Total > (
    SELECT round(avg(Total), 2) 
    FROM "Invoice"
)

-- ? 'Big Ones' albumun parcalarini listele
SELECT * 
FROM "Album"
WHERE "Title" = 'Big Ones'

SELECT * 
FROM "Track"
WHERE "AlbumId" = 5

-- with subquery
SELECT * 
FROM "Track"
WHERE "AlbumId" = (
    SELECT "AlbumId" 
    FROM "Album"
    WHERE "Title" = 'Big Ones'
)

--? Mark Philips için kesilen faturaları listeleme
SELECT * 
FROM Invoice
WHERE CustomerId = (
  SELECT "CustomerId" 
  FROM "Customer" 
  WHERE "FirstName"='Mark' AND "LastName"='Philips'
)

------------------------- SQL Practice -------------------------

-- ? En yüksek fatura miktarına sahip müşterinin adını ve soyadını listele
SELECT FirstName, LastName
FROM Customer
WHERE CustomerId = (
    SELECT CustomerId
    FROM Invoice
    ORDER BY Total DESC
    LIMIT 1
);

-- ? En pahalı parçanın adını ve fiyatını listele
SELECT Name, "UnitPrice"
FROM "Track"
ORDER BY "UnitPrice" DESC 
LIMIT 1;


--? Faturasi 10'dan büyük olan faturaların sayısını bulun
SELECT count('InvoiceId')
FROM "Invoice"
WHERE "Total" > 10;

--? Her bir stateteki müşteri sayısını ve state adını listele (müşterisi olmayan state hariç)
SELECT "State", count("CustomerId") musteriSayisi
FROM "Customer"
WHERE "State" NOT NULL
GROUP BY "State"
ORDER BY musteriSayisi DESC;


