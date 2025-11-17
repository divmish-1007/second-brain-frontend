import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL, FRONTEND_URL } from '../config'



function Dashboard() {

  const [modelOpen, setModelOpen] = useState(false)
  const contents = useContent()

  return (
    <div>
      <Sidebar/>
      <div className='p-2 ml-64 min-h-screen bg-gray-100 border-2'>
          <CreateContentModel open={modelOpen} onClose={() => {
            setModelOpen(false)
          }}/>

          <div className='flex justify-end gap-4 '>
            <Button 
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share:true
                }, {
                  headers:{
                    "token":localStorage.getItem("token")
                  } 
                });
                const shareUrl = `${FRONTEND_URL}/${response.data.link}`
                navigator.clipboard.writeText(shareUrl)
                alert("Copied to Clipboard")
              }}

              startIcon={<ShareIcon />}
              variant='secondary'
              title='Share Brain'>
            </Button>
            <Button onClick={() => {
              setModelOpen(true)
            }}
              startIcon={<PlusIcon />}
              variant='primary'
              title='Add Content'>
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {contents.map(({type, link, title }) => <Card 
              title={title} 
              type={type} 
              link={link} 
            />)}
          </div>
          
      </div>
    </div>
  )
}
 
export default Dashboard
