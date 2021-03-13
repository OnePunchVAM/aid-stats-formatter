
const modifier = (text) => {
  let modifiedText = text

  // Add custom code here

  // Technically you could call this function from anywhere, the correct
  // place would be right after modifying `state.displayStats`
  statsFormatterPlugin.execute(statsFormatterConfig)

  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
