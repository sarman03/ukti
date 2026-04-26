
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://buocglmujbldrthkofvu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1b2NnbG11amJsZHJ0aGtvZnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NjQ5NDAsImV4cCI6MjA5MTU0MDk0MH0.hr7AVRbzQAE9d446sEvN_EoFjxnYUziKNLvtkbtlZCY'
const supabase = createClient(supabaseUrl, supabaseKey)

const configPath = 'content/classroom-page-cards.json'

async function updateConfig() {
  console.log('Fetching current config...')
  const { data: downloadData, error: downloadError } = await supabase.storage.from('images').download(configPath)
  
  if (downloadError) {
    console.error('Download error:', downloadError)
    return
  }

  const text = await downloadData.text()
  const cards = JSON.parse(text)

  console.log('Updating cards...')
  const updatedCards = cards.map(card => {
    if (card.id === 'page-pre-nursery') {
      return {
        ...card,
        description: card.description.replace('3-4 years', '2-3 years')
      }
    }
    if (card.id === 'page-nursery') {
      if (!card.description.includes('aged 3-4 years')) {
        return {
          ...card,
          description: 'For children aged 3-4 years, ' + card.description.charAt(0).toLowerCase() + card.description.slice(1)
        }
      }
    }
    return card
  })

  console.log('Uploading updated config...')
  const blob = new Blob([JSON.stringify(updatedCards, null, 2)], { type: 'application/json' })
  const { data: uploadData, error: uploadError } = await supabase.storage.from('images').upload(configPath, blob, {
    contentType: 'application/json',
    upsert: true
  })

  if (uploadError) {
    console.error('Upload error:', uploadError)
  } else {
    console.log('Successfully updated Supabase config!')
  }
}

updateConfig()
