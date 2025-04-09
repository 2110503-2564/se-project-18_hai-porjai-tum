import ChatSelecter from "@/components/ChatSelecter"

export default function ChatLayout(
    { children}:
        { children: React.ReactNode }
) {
    return (
        <div className="flex flex-row pt-3">
            <ChatSelecter/>
            <div className="flex flex-col w-full">
                {children}
            </div>
        </div>
    )
}