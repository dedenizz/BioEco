# BioEcosystem — Urun Elestirmeni ve Problem Yaratan Denetim Raporu
Surum: 4.86.0 (Hour 206 - Product Critic / Challenger Oturumu)
Konu: Kambriyen Duyu ve Gorme Derinligi Denetimi, Av-Avci Algi Karsilasmalari Degerlendirmesi
Sifir emoji kuralina tam uyum saglanmistir.

## 1. Elestirmen Sorgulamasi: "Gozler Var Ama Goren Var Mi?"
Epoch 16 kapsaminda Saat 201-205 arasinda hayata gecirilen statokist kapsulleri, rhopalia denge dugumleri, cift ocelli goz benekleri ve 37. telemetri kanali (% SII) projeye muazzam bir mikroskopik zarafet ve matematiksel kararlilik kazandirdi. 10.000 adimlik QA stres testinde 0 NaN ve 14.100+ TPS basarim elde edildi.

Ancak bir son kullanici, arastirmaci veya ekosistem gozlemcisi gozuyle simulasyonu sorguladigimizda kritik bir eksiklik gun yuzune cikmaktadir:
"Canlilarin gozleri ve statolitleri var; ancak bu yapilar henuz av-avci iliskilerini kokten degistiren dramatik bir dinamik yaratmiyor. Isik ortami pasif, gorme hala basit bir dairesel yaricap kontrolunden ibaret ve canlilar dinamik isik uretip birbirini avlayamiyor."

Bu durum, Kambriyen doneminde gormenin evrimiyle patlak veren "Isik Dugmesi Hipotezi"nin (Light Switch Hypothesis - Andrew Parker) simulasyonda henuz eksik kaldigini gostermektedir.

---

## 2. Tespit Edilen 3 Temel Tasarim ve Oynanis Sorunu

### Sorun A: Pasif Isik Kaynagi ve Yetersiz Fototaktik Cazibe
Su anda ocelli fototaksisi yalnizca soyut bir cevresel gradyana bakmaktadir. Petri kabinda canlilarin kendilerinin yaydigi biyolojik isik kaynaklari (biyoluminesans) bulunmamaktadir.
- Cozum (Hour 207 - System Agent): Canlilara enzimatik lusiferin-lusiferaz fotofor organlari ve biyo-luminesans yayilim geni eklenmelidir. Karnivor ve leşçiller karanlikta avlarini isikla cezbedebilmeli (Aggressive Mimicry / Isik Tuzagi), otcullar ise isik tuzagina dogru cekilmelidir.

### Sorun B: Gorsel Algida Yonluluk ve Isik Pariltisi Eksikligi
Goz benekleri canlinin basinda statik durmakta, ancak avcinin ya da avin ne gordugu, isigin nereye vurdugu ve fotofor pariltilari gorsel olarak yeterince buyuleyici bir optik derinlik sunmamaktadir.
- Cozum (Hour 208 - Looks Agent): Fotofor pariltilari (turkuaz-zumrut fotofor atimlari, #38bdf8 / #10b981) canli cevresi siviyi aydinlatmali, fototaktik koniler ve secili canlida yonelimsel gorme acisi (visual awareness cone) cizilmelidir.

### Sorun C: Isik Akisinin Ekolojik Dengeye ve Telemetriye Baglanmasi
Biyo-luminesans ve fototaksi yalnizca gorsel bir sus olarak kalmamali; besin bulma verimini artirarak tasima kapasitesini buyutmeli ve telemetri uzerinde olculmelidir.
- Cozum (Hour 209 UI & Hour 210 Executive Director): 38. Telemetri Kanali (Fototaktik Aki Indeksi - % PFI) devreye alinmali, besin karsilasma oranlarindaki yukselisle birlikte tasima kapasitesi tavanı tarihi Peak 237+ seviyesine cikarilmalidir.

---

## 3. Gelecek Oturumlar Icin Eylem Plani (Hours 207-210)
- Hour 207 (System Agent): src/organs/sensory.js & src/genetics/dna_definitions.js — Biyo-luminesans fotofor bezleri, lusiferin salinimi, isik tuzagi mekanigi ve fototaktik avlanma algoritmasi.
- Hour 208 (Looks Agent): src/render/sensory_optics.js — Dinamik biyo-luminesans fotofor patlamalari, mikroskopik su ici isik aydinlatmasi ve konik gorme alani optigi.
- Hour 209 (UI Agent): src/ui/telemetry_sensory.js & css/ — 38. Telemetri Kanali: Fototaktik Aki Indeksi (% PFI) ve Biyo-Luminesans HUD gostergesi.
- Hour 210 (Executive Director): Epoch 16 Buyuk Duyu Sentezi, Tasima Kapasitesi Zirvesi (Peak 237+) ve Buyuk Kambriyen Duyu Jubilesi.
