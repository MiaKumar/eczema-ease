import { useState, useCallback, useEffect } from 'react'
import { getEntries, saveEntry } from '../data/storage'

export function useEntries() {
  const [entries, setEntries] = useState(getEntries)

  const refresh = useCallback(() => {
    setEntries(getEntries())
  }, [])

  const updateEntry = useCallback((dateKey, data) => {
    saveEntry(dateKey, data)
    setEntries(getEntries())
  }, [])

  return { entries, refresh, updateEntry }
}
