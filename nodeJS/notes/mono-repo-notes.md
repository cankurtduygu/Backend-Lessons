Monorepo bir tradeoff.Anlamı: Bir şeyi kazanırken başka bir şeyden vazgeçmek zorunda kalmak.


Senin eski yapın:

todo-app/
├── client/
│   └── package.json   ← kendi bağımlılıkları
└── server/
    └── package.json   ← kendi bağımlılıkları
Burada client ve server birbirini tanımıyor. Sadece aynı klasörde oturan iki ayrı proje. Aralarında şunları yapamazsın:

client'tan server'daki bir TypeScript tipini import edemezsin
İkisini tek komutla başlatamazsın (npm run dev ya sadece biri)
Ortak bir util fonksiyon yazmak istersen kopyala-yapıştır yapman gerekir
server'da User tipini değiştirsen, client'ın bunu bilmesinin yolu yok

Monorepo ne ekliyor:

reading-list/
├── packages/
│   └── types/          ← @reading/types adlı gerçek bir npm paketi
├── apps/
│   ├── web/package.json  →  "@reading/types": "workspace:*"
│   └── api/package.json  →  "@reading/types": "workspace:*"
└── pnpm-workspace.yaml   ← bunları birbirine bağlayan şey
workspace:* satırı kritik. Bu sayede apps/web içinde şunu yazabiliyorsun:

import type { Book } from "@reading/types";
Ve bu node_modules'den değil, kendi packages/types klasöründen geliyor. Book tipine bir alan ekleyince hem web hem api aynı anda TypeScript hatası veriyor.

### adim adim nasil olusturulur bir mono-repo

# adim1: 
cd C:\Users\dygca\Desktop
mkdir reading-list-app
cd reading-list-app
git init

# Adım 2 — Root package.json oluştur

reading-list klasörünün içinde bir package.json dosyası oluştur. Bunu iki şekilde yapabilirsin:

cd C:\Users\dygca\Desktop\reading-list
pnpm init

{
  "name": "reading-list",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "^5.4.5"
  }
}

pnpm install

# Adim 3 pnpm-workspace.yaml oluştur

touch pnpm-workspace.yaml

cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF
(not: EOF "End of File" kelimesinin kısaltması ama aslında istediğin herhangi bir kelimeyi yazabilirdin. Sadece bir işaret — "buraya kadar yaz" demek.)

Şu an klasör yapın şöyle:

reading-list-app/
├── apps/
│   ├── web/
│   └── api/
└── packages/
    └── types/
Her birinin kendi package.json'ı var. Ama pnpm bunların "aynı workspace'e ait" olduğunu nereden bilecek?

pnpm-workspace.yaml tam bunu söylüyor. "Bu klasördeki apps/* ve packages/* altındakiler birbirini tanısın, workspace:* ile birbirini import edebilsin" diyor.

Bu dosya olmasa @reading/types yazdığında pnpm npm'de arar, bulamaz, hata verir.

YAML nedir?

JSON'ın daha okunabilir hali. Süslü parantez yok, tırnak yok, girinti ile hiyerarşi kuruyorsun.

Aynı şeyi JSON'la yazmak zorunda olsaydın:

{
  "packages": [
    "apps/*",
    "packages/*"
  ]
}
YAML'da:

packages:
  - "apps/*"
  - "packages/*"
pnpm package.json yerine pnpm-workspace.yaml kullanmayı tercih etmiş çünkü config dosyalarında YAML daha yaygın ve okunması kolay.



# Adim 4 -turbo.json olustur

cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
EOF
Bu dosya ne yapıyor?

turbo.json ne işe yarar?

pnpm dev dediğinde pnpm ne yapacağını bilmez — hangi sırayla, hangi paketi çalıştıracak?

turbo.json bunu söylüyor. "Önce bağımlılıkları build et, sonra beni çalıştır, dev'i cache'leme" gibi kurallar burada.

Olmasa pnpm dev sadece root'taki scripti çalıştırır, apps/web ve apps/api'yi bilmez.

dev görevi:

cache: false — dev sunucusu her zaman sıfırdan başlasın, cache'lenmesin
persistent: true — kapanmayan uzun süre çalışan bir process (sunucu gibi)
build görevi:

"dependsOn": ["^build"] — ^ işareti kritik. "Beni build etmeden önce bağımlı olduğum paketleri build et" demek. Yani web build edilmeden önce types otomatik build edilir.
outputs — Turbo'nun cache'leyeceği klasörler

# Adım 5 — packages/types oluştur
Şimdi klasör yapısını oluşturmaya başlıyoruz. İlk önce paylaşılan tipler paketi.

mkdir -p packages/types/src
cd packages/types
pnpm init

cat > package.json << 'EOF'
{
  "name": "@reading/types",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
EOF

# Adım 6 — packages/types/src/index.ts oluştur
cat > src/index.ts << 'EOF'
export interface Book {
  _id: string;
  title: string;
  author: string;
  status: "reading" | "completed" | "want-to-read";
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
EOF