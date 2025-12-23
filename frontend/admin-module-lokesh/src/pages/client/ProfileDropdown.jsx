import { LogOut, User } from "lucide-react";

export default function ProfileDropdown() {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800/60 cursor-pointer">
      <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-semibold">
        JD
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-slate-200">
          John Doe
        </p>
        <p className="text-xs text-slate-400">
          Client
        </p>
      </div>

      <LogOut className="w-4 h-4 text-slate-400" />
    </div>
  );
}

