import React from 'react'
import ChatIcon from '../../components/svg/ChatIcon'
import PlusIcon from '../../components/svg/PlusIcon'
import SendIcon from '../../components/svg/SendIcon'
import SettingsIcon from '../../components/svg/SettingsIcon'

export { Page }

function Page() {
  return (
    <div className='flex flex-row w-full bg-main'>
      <SideBar />
      <div className="h-full border-r border-light w-1"></div>
      <ChatBrowser /> 
      <div className="h-full border-r border-light w-1"></div>
      <CurrentChat />
    </div>
  )
}

const SideBar = () => {
  const iconStyles = `h-8 w-8 my-3 hover:text-contrast-bg cursor-pointer`
  const Selected = () => {
    return <div className='absolute left-0 w-2 h-8 bg-contrast-bg rounded-r'></div>
  }

  return (
    <div className="flex flex-col w-24 h-full items-center justify-between text-light">
      <h1 className='text-text font-bold text-xl m-4 font-mono'>UCHAT</h1>
      <div className="flex flex-col w-full items-center justify-center max-h-[50vh]">
        <SettingsIcon styles={iconStyles}/>
        <div className="relative flex w-full items-center justify-center">
          <Selected />
          <ChatIcon styles={iconStyles}/>
        </div>
      </div>
      <Avatar styles='m-6'/>
    </div>
  )
}

const Avatar = ({styles}: {styles?: string}) => {
  return (
    <div className={`avatar w-12 ${styles}`}>
      <div className="rounded-full ring ring-offset-main ring-offset-2 ring-contrast-bg group-hover:ring-contrast-text group-hover:ring-offset-contrast-bg">
        <img src="https://placeimg.com/192/192/people" />
      </div>
    </div>
  )
}

const ChatBrowser = () => {
  return (
    <div className="flex flex-col w-[22rem] h-full">
      <div className="flex flex-row items-center w-full h-24 p-6">
        <h1 className='text-4xl font-semibold text-text'>Chats</h1>
      </div>
      <span className='text-text font-semibold px-5'>Last Messages</span>
      <div className="flex flex-col overflow-auto p-5" id='journal-scroll'>
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  )
}

const ChatCard = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full bg-neutral rounded-xl py-5 my-3 hover:bg-contrast-bg group cursor-pointer relative">
      <Avatar styles='h-10'/>
      <div className="flex max-w-[15rem] flex-col px-2">
        <p className='text-text group-hover:text-contrast-text font-semibold'>Random Name</p>
        <p className='truncate text-text text-xs group-hover:text-contrast-text'>random message goes here lollllzz</p>
      </div>
      <div className='absolute right-3 w-3 h-3 rounded-full bg-contrast-bg group-hover:bg-contrast-text'></div>
    </div>
  )
}

const CurrentChat = () => {
  return (
    <section className="flex flex-1 w-full h-full">
      <section className='h-full flex-1 flex-row p-4'>

        <div className="flex flex-row items-center h-16">
          <Avatar styles='m-2'/>
          <div className="flex max-w-[15rem] flex-col px-4 text-text">
            <p className='font-bold text-lg'>Random Name</p>
            <p className='truncate text-sm'>Online</p>
          </div>
        </div>

        
        <div className="flex flex-col-reverse bg-neutral w-full h-[calc(100%_-_4.6rem)] rounded-xl mt-3">
          <div className="flex flex-row w-full py-2 items-center justify-center">
            <div className="flex items-center justify-center text-contrast-text w-12 h-12 rounded-lg border hover:hover:bg-contrast-bg border-contrast-text hover:text-contrast-text cursor-pointer">
              <PlusIcon styles='h-6 w-6'/>
            </div>
            <input type="text" placeholder="Type here..." className="input input-bordered input-error text-text focus:outline-contrast-bg border-light bg-light mx-2 rounded-2xl w-[80%]" />
            <div className="flex items-center justify-center text-contrast-text w-12 h-12 rounded-lg border hover:hover:bg-contrast-bg border-contrast-text hover:text-contrast-text cursor-pointer">
              <SendIcon styles='h-6 w-6'/>
            </div>

          </div>
        </div>
      </section>
      <section className='w-[14rem] h-full'>

      </section>
    </section>
  )
}