// components/AdminInbox.tsx
import Image from "next/image";

type Props = {
  users: { id: string; name: string; avatar?: string }[];
  selectedUserId: string | null;
  onSelect: (user: any) => void;
};

export default function AdminInbox({ users, onSelect, selectedUserId }: Props) {
  return (
    <div className="flex gap-6 overflow-x-auto px-2 py-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col items-center cursor-pointer hover:opacity-90"
          onClick={() => onSelect(user)}
        >
          <div className={`w-16 h-16 rounded-full border-2 p-1 
              ${selectedUserId === user.id ? "border-red-500" : "border-gray-300"}`}>
            <Image
              src={user.avatar || "/img/user.jpg"}
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <span className="text-xs mt-1 text-center truncate w-16">{user.name}</span>
        </div>
      ))}
    </div>
  );
}
