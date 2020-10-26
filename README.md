# webbclient

## Val av teknik

Jag valde att fortsätta jobba med Vue då jag arbetat i detta ramverk hela kursen och lärt mig en hel del. Det kändes lite mycket att sätta sig in i ett nytt ramverk inför projektet.
När jag valde Vue inför kursen så var det på grund utav att av det jag löste och hörde så verkade Vue vara ett slags mellanting mellan React och Angular och att det skapades utifrån vad utvecklare
tyckte var nackdelarna med de ramverken. Detta lät intressant för mig så jag körde på Vue. Jag valde att implementera samma autentiseringsteknik som på min me sida, med hjälp utav JSON Web Tokens. Jag tyckte det fungerade bra
på min me-sida och jag behövde inte modifiera något i min front-end för att få det att fungera. För att kunna sätta in medel och handla aktier så skickar jag requests med hjälp utav Fetch mot mitt API. Precis som med JWT så kunde jag
återanvända väldigt mycket kod från me-sidan vilket jag strävade efter. Det kanske hade varit spännande att utmana sig själv med nya tekniker men då tiden är begränsat kände jag att jag ville satsa på tekniker jag använt förut och att inte skriva om kod jag redan hade sen tidigare. 


### Tester
Jag har via Selenium skrivit tester som via 'npm test' testar följande use-cases lokalt.

Från startsidan kan användaren ta sig till inloggningssidan via en knapp.

Från startsidan kan användaren navigera sig vidare till registreringssidan via en knapp.

En registrerad användare kan logga in och då automatiskt skickas vidare till en översikt av sitt konto.

En inloggad användare kan via en knapp navigera till en sida för att köpa aktier.

En inloggad användare kan via en knapp ta sig till en sida för att sätta in pengar till sin depå.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
