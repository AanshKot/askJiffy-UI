import { Toaster } from "@/components/ui/toaster";

export default async function ChatLayout({children} : Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
            {children}
            <Toaster />
        </>
    );
}