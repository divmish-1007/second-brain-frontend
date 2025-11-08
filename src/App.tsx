import { useState } from 'react'
import { Button } from './components/ui/Button'
import  { PlusIcon } from './icons/PlusIcon'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button startIcon={<PlusIcon/>} size='sm' variant='primary' text='Primary'/>
      <Button size='md' variant='secondary' text='Add Content'/>
      <Button size='lg' variant='secondary' text='Add Content'/>
    </>
  )
}

export default App
