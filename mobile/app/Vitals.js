//Vitals.js
export async function Vitals(updateVitalsCallback) {
  const generateVitals = () => ({
    heartRate: Math.floor(Math.random() * 60) + 10, // 50-110 range
    steps: Math.floor(Math.random() * 8000) + 2000,
    sleep: Math.floor(Math.random() * 6) + 4,
    spo2: Math.floor(Math.random() * 10) + 90, // 90-100 range
    temperature: (Math.random() * 3 + 35.5).toFixed(1),
  });

  const analyzeVitals = (vitals) => {
    const reasoningTriggers = [];
    let severityScore = 0;

    if (vitals.heartRate > 95 || vitals.heartRate < 65) {
      reasoningTriggers.push({ vital: "heartRate", value: vitals.heartRate });
      severityScore += 3;
    }
    if (vitals.sleep < 6 || vitals.sleep > 10) {
      reasoningTriggers.push({ vital: "sleep", value: vitals.sleep });
      severityScore += 2;
    }
    if (vitals.spo2 < 95) {
      reasoningTriggers.push({ vital: "spo2", value: vitals.spo2 });
      severityScore += 5;
    }
    if (vitals.temperature > 37.6 || vitals.temperature < 35.6) {
      reasoningTriggers.push({
        vital: "temperature",
        value: vitals.temperature,
      });
      severityScore += 3;
    }

    reasoningTriggers.push({ vital: "steps", value: vitals.steps });

    return { reasoningTriggers, severityScore };
  };

  const snapshot = generateVitals();
  const analysis = analyzeVitals(snapshot);
  const shouldNotify = analysis.severityScore >= 5;

  // Push AI advice if needed
  let advice = null;
  if (shouldNotify && updateVitalsCallback) {
    try {
      const response = await fetch(
        "https://mobilix.com.ng/loidai/api/advice.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reasoningTriggers: analysis.reasoningTriggers,
          }),
        },
      );
      const result = await response.json();
      advice = result.success ? result.advice : "No advice returned";
    } catch (err) {
      advice = "Network error fetching advice";
    }
  }

  const vitalsResult = { snapshot, analysis, shouldNotify, advice };

  // Update context so Dashboard or Notifications can access it
  if (updateVitalsCallback) updateVitalsCallback(vitalsResult);

  return vitalsResult;
}
