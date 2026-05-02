# CB Radio Online — różne sieci Wi‑Fi

Ta wersja działa tak:
- serwer Node.js udostępnia stronę `client.html`,
- ten sam serwer obsługuje WebSocket,
- Ty i kolega wchodzicie w ten sam publiczny link.

## Uruchomienie lokalne do testu

npm install
npm start

Potem otwórz:
http://localhost:3000

## Żeby działało na dwóch różnych sieciach Wi‑Fi

Musisz uruchomić ten projekt na publicznym serwerze Node.js, np.:
- VPS,
- hosting Node.js,
- tunel typu ngrok / Cloudflare Tunnel,
- platforma obsługująca Node.js i WebSocket.

Po wrzuceniu projektu dostajesz link, np.:
https://moje-cb-radio.example.com

Ty i kolega wchodzicie w ten sam link:
https://moje-cb-radio.example.com

W polu serwera aplikacja sama ustawi:
wss://moje-cb-radio.example.com

Klikacie POŁĄCZ, wybieracie ten sam kanał i trzymacie NADAWAJ.

## Ważne

- Na publicznym hostingu najlepiej używać HTTPS, wtedy WebSocket musi być jako WSS.
- Mikrofon w przeglądarce działa normalnie na HTTPS.
- Jeśli otworzysz plik jako file://, mikrofon i połączenie mogą działać gorzej. Najlepiej wchodzić przez adres strony.
- To wersja prosta. Do jakości jak Discord/Zello najlepiej później przerobić audio na WebRTC.
