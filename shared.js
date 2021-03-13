/*
 * Configuration
 */
const statsFormatterConfig = {
  order: [],
  alignVertical: false,
  truncateLabels: false
}


/*
 * Stats Formatter Plugin
 */
class StatsFormatterPlugin {
  constructor() {
    if (!state.displayStats) state.displayStats = []
    if (!state.statsFormatterPlugin) state.statsFormatterPlugin = {
      isDisabled: false,
      displayStats: []
    }
    this.state = state.statsFormatterPlugin
  }

  execute(options = {}) {
    // Don't run if disabled
    if (this.state.isDisabled) return

    // Set defaults
    options.order = options.order || []
    options.alignVertical = !!options.alignVertical
    options.truncateLabels = !!options.truncateLabels

    // Detect new stats and add them to state
    const existingKeys = this.state.displayStats.map(s => s.key)
    const newStats = state.displayStats.filter(s => s.key !== "" && !existingKeys.includes(s.key))
    if (newStats.length) this.state.displayStats = this.state.displayStats.concat(newStats)

    // Detect stats that are updated
    const newStatsKeys = newStats.map(s => s.key)
    const updateStats = state.displayStats.filter(s => s.key !== "" && !newStatsKeys.includes(s.key))
    if (updateStats.length) this.state.displayStats.map(stat => {
      for (let updateStat of updateStats) {
        if (updateStat.key === stat.key) {
          stat.value = updateStat.value
          return stat
        }
      }
      return stat
    })

    // Remove stats with undefined value
    this.state.displayStats = this.state.displayStats.filter(s => s.value !== undefined)

    // Do ordering
    const orderedStats = []
    for (let statName of options.order) {
      const stat = this.state.displayStats.find(s => s.key.toLowerCase() === statName.toLowerCase())
      if (stat) orderedStats.push(stat)
    }
    const orderedKeys = orderedStats.map(s => s.key)
    this.state.displayStats = orderedStats.concat(this.state.displayStats.filter(s => !orderedKeys.includes(s.key)))

    // Do formatting
    if (options.truncateLabels) {
      state.displayStats = this.state.displayStats.map(stat => Object.assign({}, stat, {
        key: "",
        value: stat.value + " :" + (options.alignVertical ? "\n" : "")
      }))
    } else {
      let allStatsButLast = this.state.displayStats.slice(0, -1)
      let suffix = options.alignVertical ? "\n" : " "
      allStatsButLast = allStatsButLast.map(s => Object.assign({}, s, {value: s.value + suffix}))
      state.displayStats = allStatsButLast.concat(this.state.displayStats.slice(-1))
    }
  }
}
const statsFormatterPlugin = new StatsFormatterPlugin()
