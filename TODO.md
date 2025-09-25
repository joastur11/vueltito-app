## Plan
  El usuario ingresa monto + plazo (ej. 12 meses).
  Según la inversión elegida (ej. plazo fijo TNA 40%), hacés el cálculo mes a mes → capital + intereses.
  Ejemplo: con 1M ARS a 12 meses, a 40% TNA, la TEA es ~49%. Entonces mostrarías: “Al final tendrías $1.49M ARS (sin descontar inflación)”.
  Si elegís plazo fijo UVA, necesitás indexar por inflación → tomás proyecciones (ej. 100% anual) y aplicás.

  Podés dar una tabla comparativa:
    Plazo fijo tradicional
    Plazo fijo UVA
    Dólar (si lo hubieras comprado hoy y solo guardás)

  ## APIs
    Usar BCRA API para tasas vigentes.
    Usar REM para proyecciones (inflación y dólar).
    Usar Dólar API para el paralelo, porque en la práctica la gente piensa en dólares, no en el oficial.

    Ahi tengo:
      “Plazo fijo tradicional” → TNA actual.
      “Plazo fijo UVA” → inflación proyectada (REM).
      “Comprar dólar blue/MEP” → cotización actual + proyección REM.
