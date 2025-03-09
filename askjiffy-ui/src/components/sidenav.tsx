// cards for today,yesterday and past 7 day chats, these cards will be client components that render in a suspense provider and have skeleton for them
// this sidenav component will be server side



/** alternatively for the yesterday and past 7 days could  be server side components and today will be a client one, only issue is if user reinteracts with yesterday
 * or past 7 day chat it will cause the card to rerender (updated lastUpdated date for the chat)
 * every card must be a client component then?
 * these cards will only be loaded if the user is authenticated (server side authentication call on sidenax)
 * */ 

import { auth } from "@/lib/auth/authConfig";

export default async function SideNav(){
    const session = await auth();
    return(
        <div className="space-y-2">
            <h1>
                SideNav
            </h1>
            <p>
                This page is server rendered
            </p>
            <p>{session?.user?.email}</p>
        </div>
    )
}