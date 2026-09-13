# Native-SQL-Server-Manager-Website

Strona produktowa Native SQL Server Manager — `nssm.kbksoftware.com`, hostowana na GitHub Pages
z gałęzi `main`. Statyczny HTML, bez generatora i bez kroku budowania.

## Podgląd lokalny

```
python3 -m http.server 8765
```

Następnie `http://localhost:8765/`.

**Otwieranie `index.html` przez dwuklik (`file://`) nie wystarcza**: odnośniki do podstron są
absolutne (`/ssms-for-mac/`), więc przy protokole `file://` przeglądarka szuka ich w katalogu
głównym dysku i klikanie nic nie daje. Obrazy i style działają, bo mają ścieżki względne.

## Struktura

| Ścieżka | Rola |
|---|---|
| `index.html` | strona główna: hero, funkcje, zrzuty, cennik, FAQ |
| `windows-authentication-kerberos/` | Kerberos SSO z Maca |
| `entra-id-sql-server-mac/` | logowanie przez Microsoft Entra ID |
| `connect-without-odbc/` | połączenie bez sterowników ODBC |
| `ssms-for-mac/` | SSMS na Macu — czym zastąpić |
| `azure-data-studio-alternative-mac/` | po wycofaniu Azure Data Studio |
| `changelog/` | historia wydań |
| `assets/` | CSS, JS, fonty, zrzuty (szczegóły w `assets/README.md`) |

## Dodawanie podstrony

Najprościej skopiować `connect-without-odbc/index.html` i podmienić treść. Nagłówek i stopka są
powielone w każdym pliku (brak silnika szablonów), więc muszą pozostać identyczne. Lista kontrolna:

- [ ] `<link rel="canonical">` z pełnym adresem
- [ ] **oba** `<link rel="preload">` dla fontów — bez nich nagłówki są niewidoczne do ~3 s, bo
      Zilla Slab ma `font-display: block`
- [ ] `assets/site.css` i `assets/site.js` (ten drugi z `defer`)
- [ ] `favicon-64.png` i `apple-touch-icon.png`
- [ ] komplet `og:*` i `twitter:*`, w tym `og:image:width` / `height` / `alt`
- [ ] `BreadcrumbList` w JSON-LD **oraz** widoczny `<p class="breadcrumb">` — nazwa pierwszego
      elementu musi się zgadzać z widocznym tekstem odnośnika
- [ ] jeśli dodajesz `FAQPage`: **każde pytanie i odpowiedź musi być widoczne na stronie**
      (sekcja `<section class="section faq narrow">`). Dane strukturalne opisujące treść, której nie
      widać, są niezgodne z wytycznymi Google i bywają powodem ręcznej kary
- [ ] wpis w `sitemap.xml` z aktualnym `lastmod`
- [ ] odnośnik w liście przewodników w stopce **na wszystkich pozostałych stronach**
- [ ] stopka identyczna jak na `index.html`, łącznie z odnośnikiem do Native SQLite Manager

Weryfikacja przed publikacją — uruchom podgląd i sprawdź, czy każde pytanie z `FAQPage` występuje
w widocznej treści oraz czy żaden odnośnik wewnętrzny nie zwraca innego kodu niż 200.

## Narzędzia

`.claude/cropimg.swift` — kadrowanie obrazu z podanym punktem startowym, czego `sips` nie potrafi
(kadruje wyłącznie centralnie). Używane do `assets/og-image.png` i do oglądania długich zrzutów
strony po kawałku.

```
swiftc -O .claude/cropimg.swift -o .claude/cropimg
.claude/cropimg wejscie.png wyjscie.png <x> <y> <szerokość> <wysokość> [docelowa-szerokość]
```
