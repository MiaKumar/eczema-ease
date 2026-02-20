const DAYS = 7

function getLast7DayKeys() {
  const keys = []
  const d = new Date()
  for (let i = DAYS - 1; i >= 0; i--) {
    const x = new Date(d)
    x.setDate(x.getDate() - i)
    keys.push(x.toISOString().slice(0, 10))
  }
  return keys
}

export function getLast7DaysEntries(entries) {
  const keys = getLast7DayKeys()
  return keys.map((key) => ({ key, entry: entries[key] ?? null }))
}

/** Symptom trend: array of { date, label, darkColor, swelling, itch, pain } for last 7 days */
export function getSymptomTrendData(entries) {
  return getLast7DaysEntries(entries).map(({ key, entry }) => ({
    date: key,
    label: new Date(key + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).replace(',', ''),
    darkColor: entry?.darkColor ?? null,
    swelling: entry?.swelling ?? null,
    itch: entry?.itch ?? null,
    pain: entry?.pain ?? null,
  }))
}

/** Top 5 triggers in last 7 days: { name, count }[] */
export function getTopTriggers(entries) {
  const keys = getLast7DayKeys()
  const count = {}
  for (const key of keys) {
    const e = entries[key]
    if (!e) continue
    const allTriggers = [
      ...(e.foods ?? []),
      ...(e.fabrics ?? []),
      ...(e.emotions ?? []),
      ...(e.environmental ?? []),
      ...(e.menstrual ?? []),
      ...(e.products ?? []),
      ...(e.otherTriggers ?? []),
    ]
    for (const t of allTriggers) {
      count[t] = (count[t] ?? 0) + 1
    }
  }
  return Object.entries(count)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

/** Correlations: high stress avg itch, poor sleep avg itch, good sleep avg itch, body area patterns */
export function getCorrelations(entries) {
  const allEntries = Object.values(entries).filter((e) => e != null)
  const highStress = allEntries.filter((e) => e.stress === 4 || e.stress === 5)
  const poorSleep = allEntries.filter((e) => e.sleep === 1)
  const goodSleep = allEntries.filter((e) => e.sleep === 4 || e.sleep === 5)

  const avgItch = (arr) => {
    const withItch = arr.filter((e) => e.itch != null)
    if (withItch.length === 0) return null
    return withItch.reduce((s, e) => s + e.itch, 0) / withItch.length
  }

  // Body area patterns: which areas flare with high stress
  const faceAreas = ['front-head', 'front-eyes', 'front-neck']
  const highStressDays = allEntries.filter((e) => e.stress === 4 || e.stress === 5)
  const faceFlareDays = highStressDays.filter((e) => {
    if (!e.bodyAreas) return false
    return Object.keys(e.bodyAreas).some((area) => faceAreas.includes(area))
  })

  return {
    highStressAvgItch: avgItch(highStress),
    highStressDays: highStress.length,
    poorSleepAvgItch: avgItch(poorSleep),
    poorSleepDays: poorSleep.length,
    goodSleepAvgItch: avgItch(goodSleep),
    goodSleepDays: goodSleep.length,
    faceFlareWithStress: faceFlareDays.length > 0 ? (faceFlareDays.length / highStressDays.length) * 100 : null,
    faceFlareDays: faceFlareDays.length,
  }
}

/** Weekly summary for last 7 days */
export function getWeeklySummary(entries) {
  const keys = getLast7DayKeys()
  const weekEntries = keys.map((k) => entries[k]).filter(Boolean)
  const withItch = weekEntries.filter((e) => e.itch != null)
  const withPain = weekEntries.filter((e) => e.pain != null)
  const withDarkColor = weekEntries.filter((e) => e.darkColor != null)
  const withSwelling = weekEntries.filter((e) => e.swelling != null)
  const withStress = weekEntries.filter((e) => e.stress != null)
  const withSleep = weekEntries.filter((e) => e.sleep != null)
  const withFlare = weekEntries.filter((e) => e.flareSeverity && e.flareSeverity !== 'none')

  const avg = (arr, key) => {
    if (arr.length === 0) return null
    return arr.reduce((s, e) => s + (e[key] ?? 0), 0) / arr.length
  }
  const mode = (arr, key) => {
    if (arr.length === 0) return null
    const counts = {}
    arr.forEach((e) => {
      const v = e[key]
      if (v != null) counts[v] = (counts[v] ?? 0) + 1
    })
    let max = 0
    let modeVal = null
    Object.entries(counts).forEach(([v, c]) => {
      if (c > max) {
        max = c
        modeVal = v
      }
    })
    return modeVal
  }

  const stressLabels = { 1: 'Low', 2: 'Mild', 3: 'Moderate', 4: 'High', 5: 'Very high' }
  const sleepLabels = { 1: 'Poor', 2: 'Fair', 3: 'OK', 4: 'Good', 5: 'Great' }
  const flareLabels = { none: 'None', mild: 'Mild', moderate: 'Moderate', severe: 'Severe' }

  const modeStress = mode(withStress, 'stress')
  const modeSleep = mode(withSleep, 'sleep')
  const modeFlare = mode(withFlare, 'flareSeverity')

  return {
    avgDarkColor: avg(withDarkColor, 'darkColor'),
    avgSwelling: avg(withSwelling, 'swelling'),
    avgItch: avg(withItch, 'itch'),
    avgPain: avg(withPain, 'pain'),
    totalDays: weekEntries.length,
    flareDays: withFlare.length,
    mostCommonStress: modeStress != null ? stressLabels[modeStress] ?? modeStress : null,
    mostCommonSleep: modeSleep != null ? sleepLabels[modeSleep] ?? modeSleep : null,
    mostCommonFlare: modeFlare != null ? flareLabels[modeFlare] ?? modeFlare : null,
  }
}
