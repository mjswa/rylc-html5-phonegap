# README zu RYLC-HTML5-PHONEGAP #

Beispielcode zum Kapitel 10 Hybride Apps im Buch [Mobile Web-Apps mit JavaScript](http://www.opitz-consulting.com/go_javascriptbuch).

*   Voraussetzungen:
    *   Java Development Kit 1.6 oder neuer.
    *   Apache Maven 3.0.4 oder neuer.
    *   cURL Kommandozeilenwerkzeug (muss im `PATH` der Kommandozeile enthalten sein).
    *   Android SDK.
*   Bauen der Backend-Komponente:
    *   [rylc-backend](https://github.com/mjswa/rylc-backend) klonen
    *   In das Verzeichnis `rylc-backend-jar` wechseln
    *   Das Backend mittels `mvn clean install -Pintegration` bauen
*   Bauen und Starten des Android PhoneGap-Containers für ein Profil `<profil>`:
    1.   [rylc-android-phonegap](https://github.com/mjswa/rylc-android-phonegap) klonen
    1.   PhoneGap-Container via `mvn clean install -P<profile> android:deploy android:run` bauen
         und auf einem via USB angeschlossenem Gerät ausführen.

*   Bauen des Projekts inkl. Integrationstests: `mvn clean verify -Pintegration`.
    Dazu muss [Chrome](http://www.google.com/chrome) über den Kommandozeilen-Befehl `chrome` gestartet werden können.
    Alternativ kann die Property `browser` in `pom.xml` angepasst und dort der gewünschte Befehl zum Starten von Chrome
    eingetragen werden.
*   Manuelles Starten und Ausführen der Tests:
    1.   Jetty starten mittels `mvn jetty:run -Pdevelopment`.
    1.   Zum Ausführen von Unit Tests in Chrome den [Unit Spec Runner](http://localhost:8585/rylc-html5/UnitSpecRunner.html) aufrufen.
    1.   Zum Ausführen von UI Tests in Chrome den [UI Spec Runner](http://localhost:8585/rylc-html5/UiSpecRunner.html) aufrufen.
*   Starten des Projekts im Desktop-Browser:
    1.   Projekt bauen: `mvn clean install`
    1.   PhoneGap-Container bauen und starten für das Profil `phonegapproxy` (s.o.).
    1.   Webserver starten: `mvn jetty:run`
    1.   App öffnen, Eingabe von Server `http://<webserver-ip>:8585/rylc-html5/cometd`, Channel `default`, und `Connect`-Button drücken.
    1.   Im Desktop-Browser die URL [http://localhost:8585/rylc-html5](http://localhost:8585/rylc-html5) öffnen und einloggen.
*   Starten des Projekts als native App:
    1.   Projekt bauen: `mvn clean install`
    1.   PhoneGap-Container bauen und starten für das Profil `rylc` (s.o.).
    1.   Webserver starten: `mvn jetty:run`
    1.   App öffnen und einloggen
*   Erzeugen der App via PhoneGap Build (ohne Barcode-Scanner):
    1.  Erzeugen eines Accounts auf [PhoneGap Build](https://build.phonegap.com)
    1.  Benutzerinformationen in der `pom.xml`-Properties `phonegap.*` eintragen
    1.  Projekt bauen: `mvn install -Pphonegap`
    1.  Die erzeugten Binärpakete finden sich anschließend im Verzeichnis `target/phonegap`. Alternativ können sie auch im Handy von [PhoneGap Build](https://build.phonegap.com) heruntergeladen werden.
    1.  Webserver starten: `mvn jetty:run`
    1.  App öffnen und einloggen
*   Login an der Anwendung:
    *  Server `http://<webserver-ip>:8585`, Benutzer `fred`, Passwort `pass`
*   Beispiel Barcodes, die von der Anwendung eingescannt werden können (via Google Chart API generiert):
    * [Gültiger Code](https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=rylctest&choe=UTF-8).
    * [Fehlerhafter Code](https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=fehlertest&choe=UTF-8)


