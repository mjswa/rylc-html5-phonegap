# README zu RYLC-HTML5-PHONEGAP #

Beispielcode zum Kapitel 10 Hybride Apps im Buch [Mobile Web-Apps mit JavaScript](opitz-consulting.com/go_javascriptbuch).

*   Voraussetzungen:
    *   Java Development Kit 1.6 oder neuer.
    *   Apache Maven 3.0.4 oder neuer.
*   Bauen der Backend-Komponente:
    *   [rylc-backend](https://github.com/mjswa/rylc-backend) klonen
    *   In das Verzeichnis `rylc-backend-jar` wechseln
    *   Das Backend mittels `mvn clean install -Pintegration` bauen
*   Bauen des Projekts inkl. Integrationstests: `mvn clean verify -Pintegration`.
    Dazu muss [Chrome](http://www.google.com/chrome) über den Kommandozeilen-Befehl `chrome` gestartet werden können.
    Alternativ kann die Property `browser` in `pom.xml` angepasst und dort der gewünschte Befehl zum Starten von Chrome
    eingetragen werden.
*   Manuelles Starten und Ausführen der Tests:
    1.   Jetty starten mittels `mvn jetty:run -Pdevelopment`.
    1.   Zum Ausführen von Unit Tests in Chrome den [Unit Spec Runner](http://localhost:8585/rylc-html5/UnitSpecRunner.html) aufrufen.
    1.   Zum Ausführen von UI Tests in Chrome den [UI Spec Runner](http://localhost:8585/rylc-html5/UiSpecRunner.html) aufrufen.
*   Manuelles Ausführen der Tests via js-test-driver:
    1.  mvn jetty:run-war -Pintegration ausführen
    1.  jstd-server.sh ausführen
    1.  Einen Browser über die URL http://localhost:9999 mit jstd verbinden
    1.  Zum Ausführen der Tests jstd-unit.sh bzw. jstd-ui.sh aufrufen.
*   Erzeugen der App via PhoneGap Build:
    1.  Erzeugen eines Accounts auf [PhoneGap Build](https://build.phonegap.com)
    1.  Benutzerinformationen in der `pom.xml`-Properties `phonegap.*` eintragen
    1.  mvn package -Pphonegap
    1.  Die erzeugten Binärpakete finden sich anschließend unter target/phonegap
    1.  Alternativ können sie auch im Handy von [PhoneGap Build](https://build.phonegap.com) heruntergeladen werden.

TODO: Im Trunk ist ein Barcode-Scanner enthalten, funktioniert aber nur mit rylc-android-phonegap.
Beispiel Promo-Codes:
- OK: https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=rylctest&choe=UTF-8
- Fehlerhaft: https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=fehlertest&choe=UTF-8
