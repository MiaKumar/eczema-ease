import { useState, useMemo } from 'react'
import { useEntries } from '../hooks/useEntries'
import {
  getSymptomTrendData,
  getTopTriggers,
  getCorrelations,
  getWeeklySummary,
} from '../utils/insights'
import InsightsLineChart from '../components/InsightsLineChart'
import TriggerBarChart from '../components/TriggerBarChart'

const TIMEFRAMES = [
  { days: 7, label: '7 Days' },
  { days: 30, label: '30 Days' },
  { days: 90, label: '90 Days' },
  { days: 365, label: '365 Days' },
]

export default function Insights() {
  const { entries } = useEntries()
  const [timeframe, setTimeframe] = useState(7)

  const trendData = useMemo(() => getSymptomTrendData(entries, timeframe), [entries, timeframe])
  const topTriggers = useMemo(() => getTopTriggers(entries, timeframe), [entries, timeframe])
  const correlations = useMemo(() => getCorrelations(entries, timeframe), [entries, timeframe])
  const summary = useMemo(() => getWeeklySummary(entries, timeframe), [entries, timeframe])

  const timeframeLabel = TIMEFRAMES.find((t) => t.days === timeframe)?.label ?? `${timeframe} days`

  return (
    <div className="space-y-6 pb-4">
      <h2 className="text-lg font-semibold text-sage-800">Insights</h2>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-sage-600">Timeframe:</span>
        {TIMEFRAMES.map(({ days, label }) => (
          <button
            key={days}
            type="button"
            onClick={() => setTimeframe(days)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              timeframe === days
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-seafoam-100 text-sage-700 hover:bg-seafoam-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm text-sage-600">Based on the last {timeframeLabel.toLowerCase()} of tracking.</p>

      {/* 1. Symptom trends – line charts */}
      <section>
        <h3 className="text-sm font-semibold text-sage-700 mb-3">Symptom Trends</h3>
        <div className="space-y-4">
          <InsightsLineChart
            data={trendData}
            valueKey="redness"
            label={`Redness severity (last ${timeframeLabel.toLowerCase()})`}
          />
          <InsightsLineChart
            data={trendData}
            valueKey="swelling"
            label={`Swelling severity (last ${timeframeLabel.toLowerCase()})`}
          />
          <InsightsLineChart
            data={trendData}
            valueKey="itch"
            label={`Itch severity (last ${timeframeLabel.toLowerCase()})`}
          />
          <InsightsLineChart
            data={trendData}
            valueKey="pain"
            label={`Pain severity (last ${timeframeLabel.toLowerCase()})`}
          />
        </div>
      </section>

      {/* 2. Trigger frequency – bar chart */}
      <section>
        <TriggerBarChart data={topTriggers} />
      </section>

      {/* 3. Basic correlations – text summaries */}
      <section>
        <h3 className="text-sm font-semibold text-sage-700 mb-3">Correlations</h3>
        <div className="bg-white rounded-xl border-2 border-seafoam-200 p-4 shadow-sm space-y-3">
          {correlations.highStressDays > 0 && correlations.highStressAvgItch != null ? (
            <p className="text-sm text-sage-700">
              When stress level is <strong>High or Very High</strong>, your average itch severity is{' '}
              <strong>{correlations.highStressAvgItch.toFixed(1)}</strong>.
            </p>
          ) : (
            <p className="text-sm text-sage-500">Not enough high-stress days to show correlation with itch.</p>
          )}
          {correlations.poorSleepDays > 0 && correlations.poorSleepAvgItch != null ? (
            <p className="text-sm text-sage-700">
              When sleep quality is <strong>Poor</strong>, your average itch severity is{' '}
              <strong>{correlations.poorSleepAvgItch.toFixed(1)}</strong>.
            </p>
          ) : (
            <p className="text-sm text-sage-500">Not enough poor-sleep days to show correlation with itch.</p>
          )}
          {correlations.goodSleepDays > 0 && correlations.goodSleepAvgItch != null ? (
            <p className="text-sm text-sage-700">
              Days with <strong>Good or Great</strong> sleep have average itch severity of{' '}
              <strong>{correlations.goodSleepAvgItch.toFixed(1)}</strong>.
            </p>
          ) : (
            <p className="text-sm text-sage-500">Not enough good-sleep days to show correlation with itch.</p>
          )}
          {correlations.faceFlareWithStress != null && correlations.faceFlareWithStress > 0 ? (
            <p className="text-sm text-sage-700">
              On <strong>{correlations.faceFlareWithStress.toFixed(0)}%</strong> of high-stress days, you experienced face flares (head, eyes, neck).
            </p>
          ) : null}
        </div>
      </section>

      {/* 4. Period summary */}
      <section>
        <h3 className="text-sm font-semibold text-sage-700 mb-3">Summary ({timeframeLabel})</h3>
        <div className="bg-white rounded-xl border-2 border-seafoam-200 p-4 shadow-sm">
          <dl className="grid grid-cols-1 gap-3 text-sm">
            {summary.avgRedness != null && (
              <div className="flex justify-between">
                <dt className="text-sage-600">Average redness severity</dt>
                <dd className="font-medium text-sage-800">{summary.avgRedness.toFixed(1)}</dd>
              </div>
            )}
            {summary.avgSwelling != null && (
              <div className="flex justify-between">
                <dt className="text-sage-600">Average swelling severity</dt>
                <dd className="font-medium text-sage-800">{summary.avgSwelling.toFixed(1)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-sage-600">Average itch severity</dt>
              <dd className="font-medium text-sage-800">
                {summary.avgItch != null ? summary.avgItch.toFixed(1) : '—'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sage-600">Average pain severity</dt>
              <dd className="font-medium text-sage-800">
                {summary.avgPain != null ? summary.avgPain.toFixed(1) : '—'}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sage-600">Tracking days</dt>
              <dd className="font-medium text-sage-800">{summary.totalDays}</dd>
            </div>
            {summary.flareDays > 0 && (
              <div className="flex justify-between">
                <dt className="text-sage-600">Days with flares</dt>
                <dd className="font-medium text-sage-800">{summary.flareDays}</dd>
              </div>
            )}
            {summary.mostCommonFlare && (
              <div className="flex justify-between">
                <dt className="text-sage-600">Most common flare severity</dt>
                <dd className="font-medium text-sage-800">{summary.mostCommonFlare}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-sage-600">Most common stress level</dt>
              <dd className="font-medium text-sage-800">{summary.mostCommonStress ?? '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sage-600">Most common sleep quality</dt>
              <dd className="font-medium text-sage-800">{summary.mostCommonSleep ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
