import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

export default (() => {
  function ContentMetadata({ cfg, fileData }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const segments: string[] = []
      const { words: _words, minutes: timeTaken } = readingTime(text)

      if (fileData.dates) {
        segments.push(formatDate(getDate(cfg, fileData)!))
      }

      const displayedTime = Math.ceil(timeTaken.toFixed(2))
      const timeScale = displayedTime > 1.0 ? 'minutos' : 'minuto'
      const timeText = 'leitura de ' + displayedTime + ' ' + timeScale

      segments.push(timeText)
      return <p class="content-meta">{segments.join(", ")}</p>
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
