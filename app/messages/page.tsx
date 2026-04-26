export default function MessagesEmptyPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#f7f3ef] flex items-center justify-center text-3xl mb-4">
        💬
      </div>
      <h2 className="text-xl font-bold text-ink">Your Conversations</h2>
      <p className="text-muted text-sm mt-2 max-w-xs">
        Select a chat from the sidebar to start messaging your customers or workers.
      </p>
    </div>
  );
}
