# Hydropulse product outline

This document records an initial product direction. It describes planned behavior, not features that are already implemented.

## Goal

Help people monitor soil moisture and water availability, then notify them when readings suggest that attention is needed.

## Possible first workflow

1. A sensor reports a moisture or water-level reading with a timestamp.
2. The platform associates the reading with a monitored location and sensor.
3. A user-defined threshold determines when a reading needs attention.
4. The platform sends an alert and shows the latest reading and its recent history.

## Decisions to make

- Which sensor hardware and communication methods to support.
- How users configure thresholds and notification channels.
- How to handle stale readings, offline sensors, and alert repeats.
- What data retention and access controls are needed.
