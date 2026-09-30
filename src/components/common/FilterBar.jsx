import React from 'react';

export const FilterBar = ({ options, activeFilter, onSelect }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
      {options.map((option) => {
        const isSelected = activeFilter === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
