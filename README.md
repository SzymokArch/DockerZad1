# Sprawozdanie Zadanie 1
Autor: Szymon Zięba 
Projekt: Aplikacja pogodowa konteneryzowana w Dockerze  

---

## Zawartość repozytorium

- app.js – plik źródłowy Express.js z funkcjami
- public/index.html – plik .html z formularzem wyboru miasta i kraju
- package.json / package-lock.json – zależności  
- Dockerfile – wieloetapowy plik Dockerfile opisujący konteneryzację
- img/screenshot.png - screenshot z działającego programu    

---

## Działanie aplikacji

Po uruchomieniu kontenera aplikacja:  
- Zapisuje do logów datę startu, imię i nazwisko autora oraz nasłuchujący port  
- udostępnia interfejs na porcie 3000  
- pozwala wybrać kraj i miasto z formularza  
- pobiera pogodę z API OpenWeatherMap  
- wyświetla dane *(temperatura, warunki, wilgotność)*  
- obsługuje błędy *(np. brak miasta lub błędny kraj)*

---

## Polecenia z realizacji zadania

### 1. Budowanie obrazu:

`docker build -t pogoda .`

*Komentarz: Buduje obraz z pliku Dockerfile. Użyto wieloetapowej budowy oraz lekkiego obrazu node:alpine.*

---

### 2. Uruchomienie kontenera:

`docker run -d -p 3000:3000 --name pogoda-kontener pogoda`

*Komentarz: Uruchamia kontener w tle, mapując port lokalny 3000 do aplikacji działającej w kontenerze.*

---

### 3. Sprawdzenie działania aplikacji (logi):

`docker logs pogoda-kontener`

Przykładowy wynik:  
[Start aplikacji] Data uruchomienia: 2025-04-21T...  
[Informacja] Autor: Szymon Zięba  
[Informacja] Aplikacja nasłuchuje na porcie: 3000

---

### 4. Informacje o obrazie

Liczba warstw i historia:

`docker history pogoda`

Szczegóły techniczne obrazu:

`docker image inspect pogoda`

*Komentarz: Pokazuje rozmiar końcowy, autora, liczbę warstw itd.*

---

## Uwagi końcowe

Aplikacja działa w pełni w środowisku kontenerowym. Wykorzystano lekką wersję Node.js (alpine), wieloetapowy build oraz prosty HEALTHCHECK.

Podczas realizacji zadania:

- zadbano o czytelne komunikaty w logach startowych aplikacji *(data, autor, port)*
- dostosowano strukturę folderów oraz nazewnictwo do potrzeb projektu
- zaimplementowano podstawową obsługę błędów *(np. niepoprawna lokalizacja)*
