# Grafični vmesnik - UI
V tem repozitoriju se nahaja koda za grafični vmesnik, ki je izdelana s pomočjo Angularja. Grafični vmesnik smo razvili
za nekaj pomembnejših funkcionalnosti za tip uporabnika Uporabnik in Lastnik.

Splošne funkcionalnosti:
- Registracija: Zaslonska maska, ki omogoča registracijo uporabniškega računa. Tukaj uporabnik vnese svoje podatke in
izbere tip uporabniškega računa.
- Prijava: Zaslonska maska, ki omogoča prijavo uporabnika. Uporabnik vnese svoje uporabniško ime in geslo.

Funkcionalnosti za uporabniški račun Uporabnik:
- Pregled seznama dogodkov: Zaslonska maska, ki omogoča pregled dogodkov, ki jih je ustvaril uporabnik.
- Pregled dogodka: Zaslonska maska, ki omogoča pregled podrobnosti dogodka in povabljenih gostov. Podrobnosti dogodka
lahko uporabnik tudi ureja.
- Dodajanje dogodka: Omogočeno je dodajanje novega dogodka.
- Upravljanje gostov: Uporabnik lahko dodaja goste na dogodek, ki bodo prejeli obvestilo na elektronsko pošto.

Funkcionalnosti za uporabniški račun Lastnik:
- Pregled prostorov: Zaslonska maska, ki omogoča pregled prostorov, z možnostjo filtriranja na prikaz prostorov, ki
pripadajo prijavljenemu lastniku.
- Urejanje prostora: Zaslonska maska, ki omogoča urejanje podrobnosti prostora, ki ga je lastnik dodal.
- Dodajanje prostora: Omogočeno je dodajanje novega prostora.

## Namestitev
Za zagon aplikacije je potrebno imeti Angular CLI. Namestimo ga s pomočjo ukaza: `npm install -g @angular/cli`.

Nato se premaknemo v mapo `najem-prostorov` in namestimo vse potrebne odvisnosti:  `npm install` .

Za zagon aplikacije uporabimo ukaz `ng serve`. Aplikacija se bo začela zaganjati na naslovu `http://localhost:4200/`.
