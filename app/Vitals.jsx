export async function Vitals() {
  // Simulate data from the watch
  function generateVitals() {
    const heartRate = 32; // bpm
    const steps = 5000; // steps
    const sleep = 2; // hours
    const spo2 = 92; // %
    const temperature = 37.6; // °C

    return { heartRate, steps, sleep, spo2, temperature };
  }

  // Analyze vitals and compute severity score
  function analyzeVitals(vitals) {
    const reasoningTriggers = [];
    let severityScore = 0;

    // Heart Rate
    if (vitals.heartRate > 95) {
      reasoningTriggers.push({
        vital: "heartRate",
        value: vitals.heartRate,
        note: "high",
      });
      severityScore += 2;
    } else if (vitals.heartRate < 65) {
      reasoningTriggers.push({
        vital: "heartRate",
        value: vitals.heartRate,
        note: "low",
      });
      severityScore += 2;
    }

    // Sleep
    if (vitals.sleep < 6) {
      reasoningTriggers.push({
        vital: "sleep",
        value: vitals.sleep,
        note: "deficit",
      });
      severityScore += 1;
    } else if (vitals.sleep > 10) {
      reasoningTriggers.push({
        vital: "sleep",
        value: vitals.sleep,
        note: "oversleep",
      });
      severityScore += 1;
    }

    // SpO2
    if (vitals.spo2 < 95) {
      reasoningTriggers.push({
        vital: "spo2",
        value: vitals.spo2,
        note: "low",
      });
      severityScore += 5;
    }

    // Temperature
    if (vitals.temperature > 37.6) {
      reasoningTriggers.push({
        vital: "temperature",
        value: vitals.temperature,
        note: "high",
      });
      severityScore += 3;
    } else if (vitals.temperature < 35.6) {
      reasoningTriggers.push({
        vital: "temperature",
        value: vitals.temperature,
        note: "low",
      });
      severityScore += 3;
    }

    // Steps (context only)
    reasoningTriggers.push({ vital: "steps", value: vitals.steps });

    return {
      reasoningTriggers,
      severityScore,
    };
  }

  // -------------------------
  // TEST FLOW
  // -------------------------

  const PUSH_THRESHOLD = 5;

  const snapshot = generateVitals();
  const analysis = analyzeVitals(snapshot);

  const shouldNotify = analysis.severityScore >= PUSH_THRESHOLD;

  console.log("Generated Vitals:", snapshot);
  console.log("Reasoning Triggers:", analysis.reasoningTriggers);
  console.log("Severity Score:", analysis.severityScore);
  console.log("Push Notification?", shouldNotify ? "YES" : "NO");

  if (shouldNotify) {
    try {
      const response = await fetch(
        "https://mobilix.com.ng/loidai/api/advice.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reasoningTriggers: analysis.reasoningTriggers,
          }),
        },
      );

      const result = await response.json();

      if (result.success) {
        console.log("AI Advice:", result.advice);
      } else {
        console.log("API Error:", result.error || result.details);
      }
    } catch (err) {
      console.error("Network or fetch error:", err);
    }
  } else {
    console.log("→ No push. Vitals not serious enough");
  }

  return true;
}
