# Assets

## Zrzuty ekranu

Źródłem są zrzuty generowane w trybie UITestMode w repozytorium aplikacji:
`Native-SQLite-Manager/fastlane/screenshots/sqlserver/en-US/` (2880×1800 PNG). **Pełnowymiarowe PNG
nie są trzymane w tym repozytorium** — zostają w fastlane, żeby nie ciągnąć po megabajcie na zrzut.

Każdy zrzut występuje w trzech wariantach:

| Wariant | Do czego | Parametry |
|---|---|---|
| `<nazwa>.webp` | wyświetlany na stronie | hero 1600 px, galeria i artykuły 1400 px |
| `<nazwa>.jpg` | zapas dla przeglądarek bez WebP | jw. |
| `<nazwa>_full.webp` | **powiększenie po kliknięciu** | pełne 2880×1800 |

Używane pliki: `21_Main_Dark` (hero), `01_Main_Light`, `02_ConnectSQLAuthentication_Light`,
`04_DatabaseProperties_Light`, `07_PreferencesFontsAndColors_Light`.

Odtworzenie wszystkich trzech wariantów ze źródła (wymaga `brew install webp`):

```
SRC=~/Documents/repozytoria_git/Native-SQLite-Manager/fastlane/screenshots/sqlserver/en-US/<nazwa>.png
sips -Z 1600 "$SRC" --out /tmp/x.png          # galeria i artykuły: -Z 1400
cwebp -q 82 -sharp_yuv /tmp/x.png -o <nazwa>.webp    # galeria: -q 80
sips -s format jpeg -s formatOptions 88 /tmp/x.png --out <nazwa>.jpg   # galeria: 86
cwebp -q 82 -sharp_yuv "$SRC" -o <nazwa>_full.webp   # pełny rozmiar do powiększenia
```

**Nie pomijaj ostatniej linii.** Bez niej podgląd po kliknięciu zostanie na starym zrzucie, a strona
nie da żadnego sygnału, że coś się rozjechało.

## Pozostałe pliki

- `site.css` — arkusz wspólny dla wszystkich stron. Ścieżki fontów są w nim względne do katalogu
  `assets/`, nie do korzenia witryny.
- `site.js` — paralaksa tekstury w hero oraz powiększanie zrzutów (nakładka). Ładowany z `defer`
  na każdej stronie. Bez skryptu odnośniki `a.zoom` po prostu otwierają pełny obraz.
- `og-image.png` — karta Open Graph / Twitter, 1200×630. Kadr lewego górnego rogu pełnego
  `21_Main_Dark.png` **ze źródła w fastlane** (region 2400×1260 przeskalowany do 1200 px).
  `sips` kadruje wyłącznie centralnie i obcina wtedy pasek tytułu okna, więc kadr z offsetem robi
  `.claude/cropimg.swift` (opis w README w korzeniu repozytorium).
- `favicon-64.png` — favicon 64×64, linkowany z każdej strony; `/favicon.ico` w korzeniu obsługuje
  przeglądarki pytające o ikonę pod stałą ścieżką.
- `apple-touch-icon.png` — 180×180.
- `icon.png` — ikona aplikacji 512×512 (render z Icon Composer). **Używana już tylko w polu `image`
  danych strukturalnych `SoftwareApplication`** na stronie głównej; favicon i ikona dotykowa mają
  własne, mniejsze pliki.
- `fonts/zilla-slab-500.woff2`, `fonts/zilla-slab-600.woff2` — Zilla Slab (Google Fonts, licencja OFL),
  self-hostowane; nagłówki, odpowiednik MuseoSlab z shottr.cc.
