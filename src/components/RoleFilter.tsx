import { Role } from "../data/championRoles";

interface RoleFilterProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * RoleFilter component - Displays the search bar and role filter buttons
 */
export const RoleFilter = ({
  selectedRole,
  onRoleChange,
  searchQuery,
  onSearchChange,
}: RoleFilterProps) => {
  const roles: {
    value: Role;
    label: string;
    color: string;
  }[] = [
    {
      value: "all",
      label: "All",
      color: "from-cyan-400 to-emerald-400",
    },
    {
      value: "top",
      label: "Top",
      color: "from-role-top to-orange-600",
    },
    {
      value: "jungle",
      label: "Jungle",
      color: "from-role-jungle to-green-600",
    },
    {
      value: "mid",
      label: "Mid",
      color: "from-role-mid to-purple-600",
    },
    {
      value: "adc",
      label: "ADC",
      color: "from-role-adc to-pink-600",
    },
    {
      value: "support",
      label: "Support",
      color: "from-role-support to-blue-600",
    },
  ];

  return (
    <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search a champion..."
              className="w-full pl-12 pr-4 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg text-white placeholder-purple-400/70 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          {/* Role filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {roles.map((role) => {
              const isSelected = selectedRole === role.value;
              return (
                <button
                  key={role.value}
                  onClick={() => onRoleChange(role.value)}
                  className={`
                    px-6 py-2.5 rounded-full font-semibold text-sm
                    transition-colors duration-200 flex items-center justify-center
                    ${
                      isSelected
                        ? `bg-gradient-to-r ${role.color} text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-accent/50`
                        : "bg-black/40 backdrop-blur-sm text-white border border-gray-700/50 hover:border-cyan-accent/50 hover:bg-black/60"
                    }
                  `}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
