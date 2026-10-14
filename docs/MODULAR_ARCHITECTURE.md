# BioEcosystem — Moduler Dosya Mimarisi Kilavuzu (Modular Architecture Blueprint)
Surum: 4.81.0 (Hour 201 - Bas Planlamaci / Lead Planner Oturumu)

## 1. Mimari Vizyon ve Hedef
BioEcosystem_Project, 200 saatlik gelistirme surecinde zengin bir evrimsel simulasyona donusmus; tek hucreli mekaniklerden tam organ sistemlerine (dolasim, bosaltim, sindirim) uzanmistir. Projenin surdurulebilir ve sakin bir tempoda buyumeye devam edebilmesi icin monolitik dosya yapisi terk edilmis, kisa ve odakli modullere ayrilmistir.

Her modul kendi uzmanlik alanina odaklanir, gereksiz kod kalabaligi icermez ve tek bir sorumluluk ustlenir (Single Responsibility Principle).

---

## 2. Dizin ve Dosya Yapisi

```
repo_extract/
|-- index.html                       # Ana giris noktasi (HTML iskeleti, canvas ve modul baglantilari)
|-- css/
|   `-- style.css                    # Tum HUD, tipografi, modal ve laboratuvar temasi stilleri
|-- src/
|   |-- core/                        # Simulasyon cekirdegi ve fizik motoru
|   |   |-- constants.js             # Ekolojik sabitler, tasima kapasitesi ve renk paletleri
|   |   |-- environment.js           # Besin akisi, akinti girdaplari ve resif yapilari
|   |   `-- simulation.js            # Ana oyun dongusu ve mekansal indeksleme (QuadTree/Grid)
|   |-- genetics/                    # Genetik ve evrim motoru
|   |   |-- dna_definitions.js       # Gen lokuslari, alel sinirlari ve mutasyon operatorleri
|   |   `-- phylogeny.js             # Soyagaci, kladistik takip ve turlesme kayitlari
|   |-- organs/                      # Fizyolojik organ sistemleri
|   |   |-- circulation.js           # Pulsatif damar agi ve hemosiyanin/hemoglobin perfuzyonu
|   |   |-- excretion.js             # Metanefridyal ultrafiltrasyon ve ozmoregulasyon
|   |   |-- digestion.js             # Tam alimenter kanal, proventrikul ve mikrovillus pH sistemi
|   |   `-- sensory.js               # [Epoch 16] Statokistler, rhopalia ve ilkel ocelli fotoreseptorleri
|   |-- render/                      # Gorsel katman ve optik efektler
|   |   |-- optics.js                # Mikroskop lens efektleri, akiskan pariltisi ve zar optigi
|   |   `-- sensory_optics.js        # [Epoch 16] Statolit kristal pariltisi ve ocelli pigment benekleri
|   `-- ui/                          # Telemetri, grafikler ve arayuz bilesenleri
|       |-- telemetry.js             # 36 kanalli Lotka-Volterra canli nufus grafigi
|       |-- inspector.js             # Organizma detay inceleme paneli
|       `-- telemetry_sensory.js     # [Epoch 16] 37. Kanal: Duyu Entegrasyon Indeksi (% SII)
|-- docs/
|   |-- ROADMAP.md                   # Saatlik gelisim plani ve gelecek vizyonu
|   `-- MODULAR_ARCHITECTURE.md      # Bu mimari tasarim belgesi
|-- CHANGELOG.md                     # Surum degisiklik gunlugu
`-- README.md                        # Proje tanitimi
```

---

## 3. Modul Kurallari ve Standartlar
1. **Odak ve Uzunluk:** Her moduler dosya tek bir sorumluluga sahip olmali, mumkun mertebe 150-300 satir arasinda tutulmalidir.
2. **Sifir Emoji:** Hicbir kod, yorum satiri, degisken ismi veya arayuz metninde emoji kullanilamaz.
3. **Bagimsiz Calisabilirlik:** Moduller, yerel tarayicilarda ek bir derleyici (bundler) gerektirmeksizin dogrudan klasik script veya standart yukleyicilerle calisabilecek bicimde tasarlanir.
4. **Rol Bazli Sahiplik:**
   - System Agent -> `src/core/`, `src/genetics/`, `src/organs/`
   - Looks Agent -> `src/render/`
   - UI Agent -> `src/ui/`, `css/`
   - QA Agent -> Modul entegrasyon testleri, 60 FPS performans denetimi
   - Lead Planner & Executive Director -> Mimari planlama ve dokumantasyon
