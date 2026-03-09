function getLastNDaysKeys(days) {
  const keys = []
  const d = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const x = new Date(d)
    x.setDate(x.getDate() - i)
    keys.push(x.toISOString().slice(0, 10))
  }
  return keys
}

export function getLastNDaysEntries(entries, days) {
  const keys = getLastNDaysKeys(days)
  return keys.map((key) => ({ key, entry: entries[key] ?? null }))
}

function getSymptomVal(entry, key) {
  if (key === 'redness') return entry?.redness ?? entry?.darkColor ?? null
  return entry?.[key] ?? null
}

function avgSymptomInGroup(items, key) {
  const vals = items.map(({ entry }) => getSymptomVal(entry, key)).filter((v) => v != null)
  if (vals.length === 0) return null
  return vals.reduce((s, v) => s + v, 0) / vals.length
}

/** Symptom trend: grouped by timeframe. 7 days = per day; 30/90 = per week (avg); 365 = per month (avg) */
export function getSymptomTrendData(entries, days = 7) {
  const keys = getLastNDaysKeys(days)

  if (days === 7) {
    return keys.map((key) => {
      const entry = entries[key] ?? null
      const d = new Date(key + 'T12:00:00')
      return {
        date: key,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        redness: getSymptomVal(entry, 'redness'),
        swelling: getSymptomVal(entry, 'swelling'),
        itch: getSymptomVal(entry, 'itch'),
        pain: getSymptomVal(entry, 'pain'),
      }
    })
  }

  if (days === 30) {
    const buckets = [[], [], [], []]
    keys.forEach((key, i) => {
      const weekIndex = Math.min(3, Math.floor(i / 7))
      buckets[weekIndex].push({ key, entry: entries[key] ?? null })
    })
    return buckets.map((weekItems, wi) => ({
      date: `week-${wi + 1}`,
      label: `Week ${wi + 1}`,
      redness: avgSymptomInGroup(weekItems, 'redness'),
      swelling: avgSymptomInGroup(weekItems, 'swelling'),
      itch: avgSymptomInGroup(weekItems, 'itch'),
      pain: avgSymptomInGroup(weekItems, 'pain'),
    }))
  }

  if (days === 90) {
    const numWeeks = 13
    const buckets = Array.from({ length: numWeeks }, () => [])
    keys.forEach((key, i) => {
      const weekIndex = Math.floor(i / 7)
      if (weekIndex < numWeeks) buckets[weekIndex].push({ key, entry: entries[key] ?? null })
    })
    return buckets.map((weekItems, wi) => ({
      date: `week-${wi + 1}`,
      label: `W${wi + 1}`,
      redness: avgSymptomInGroup(weekItems, 'redness'),
      swelling: avgSymptomInGroup(weekItems, 'swelling'),
      itch: avgSymptomInGroup(weekItems, 'itch'),
      pain: avgSymptomInGroup(weekItems, 'pain'),
    }))
  }

  if (days === 365) {
    const byMonth = {}
    keys.forEach((key) => {
      const monthKey = key.slice(0, 7)
      if (!byMonth[monthKey]) byMonth[monthKey] = []
      byMonth[monthKey].push({ key, entry: entries[key] ?? null })
    })
    const sortedMonths = Object.keys(byMonth).sort()
    return sortedMonths.map((monthKey) => {
      const items = byMonth[monthKey]
      const d = new Date(monthKey + '-01T12:00:00')
      return {
        date: monthKey,
        label: d.toLocaleDateString('en-US', { month: 'short' }),
        redness: avgSymptomInGroup(items, 'redness'),
        swelling: avgSymptomInGroup(items, 'swelling'),
        itch: avgSymptomInGroup(items, 'itch'),
        pain: avgSymptomInGroup(items, 'pain'),
      }
    })
  }

  return getLastNDaysEntries(entries, days).map(({ key, entry }) => ({
    date: key,
    label: key,
    redness: getSymptomVal(entry, 'redness'),
    swelling: getSymptomVal(entry, 'swelling'),
    itch: getSymptomVal(entry, 'itch'),
    pain: getSymptomVal(entry, 'pain'),
  }))
}

/** Top 5 triggers in last N days: { name, count }[] */
export function getTopTriggers(entries, days = 7) {
  const keys = getLastNDaysKeys(days)
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
export function getCorrelations(entries, days = 7) {
  const keys = getLastNDaysKeys(days)
  const periodEntries = {}
  keys.forEach((k) => { if (entries[k]) periodEntries[k] = entries[k] })
  const allEntries = Object.values(periodEntries).filter((e) => e != null)
  const highStress = allEntries.filter((e) => e.stress === 4 || e.stress === 5)
  const poorSleep = allEntries.filter((e) => e.sleep === 1)
  const goodSleep = allEntries.filter((e) => e.sleep === 4 || e.sleep === 5)

  const avgItch = (arr) => {
    const withItch = arr.filter((e) => e.itch != null)
    if (withItch.length === 0) return null
    return withItch.reduce((s, e) => s + e.itch, 0) / withItch.length
  }

  // Body area patterns: which areas flare with high stress
  const faceAreas = ['front-head', 'front-left-eye', 'front-right-eye', 'front-eyes', 'front-neck']
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

/** Summary for last N days */
export function getWeeklySummary(entries, days = 7) {
  const keys = getLastNDaysKeys(days)
  const weekEntries = keys.map((k) => entries[k]).filter(Boolean)
  const withItch = weekEntries.filter((e) => e.itch != null)
  const withPain = weekEntries.filter((e) => e.pain != null)
  const withRedness = weekEntries.filter((e) => (e.redness ?? e.darkColor) != null)
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

  const rednessKey = (e) => e.redness ?? e.darkColor
  return {
    avgRedness: withRedness.length ? withRedness.reduce((s, e) => s + rednessKey(e), 0) / withRedness.length : null,
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
