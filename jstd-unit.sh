#!/bin/sh
mvn exec:java -Dexec.classpathScope=test -Dexec.mainClass=com.google.jstestdriver.JsTestDriver -Dexec.args="--config jstd-unit.conf --reset --tests all --testOutput target/jstd-reports"