'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// ========================
// TYPES
// ========================

export interface FilterBarProps {
  categories: string[];
  painTypes: string[];
  selectedCategory: string | null;
  selectedPainType: string | null;
  onCategoryChange: (category: string | null) => void;
  onPainTypeChange: (painType: string | null) => void;
}

// ========================
// COMPONENT
// ========================

export function FilterBar({
  categories,
  painTypes,
  selectedCategory,
  selectedPainType,
  onCategoryChange,
  onPainTypeChange,
}: FilterBarProps) {
  const hasActiveFilters = selectedCategory || selectedPainType;

  const handleClearFilters = () => {
    onCategoryChange(null);
    onPainTypeChange(null);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3">
          Filter by Industry
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              isActive={selectedCategory === category}
              onClick={() =>
                onCategoryChange(
                  selectedCategory === category ? null : category
                )
              }
            />
          ))}
        </div>
      </div>

      {/* Pain Type Filter */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3">
          Filter by Pain Point
        </h3>
        <div className="flex flex-wrap gap-2">
          {painTypes.map((painType) => (
            <FilterButton
              key={painType}
              label={painType}
              isActive={selectedPainType === painType}
              onClick={() =>
                onPainTypeChange(
                  selectedPainType === painType ? null : painType
                )
              }
            />
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center pt-2"
        >
          <button
            onClick={handleClearFilters}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
              'text-sm font-medium',
              'bg-white/5 text-text-secondary',
              'hover:bg-white/10 hover:text-text-primary',
              'border border-white/10',
              'transition-all duration-200'
            )}
          >
            <X className="w-4 h-4" />
            Clear All Filters
          </button>
        </motion.div>
      )}

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 pt-2 border-t border-white/5"
        >
          <span className="text-sm text-text-muted">Active filters:</span>
          {selectedCategory && (
            <ActiveFilterTag
              label={selectedCategory}
              onRemove={() => onCategoryChange(null)}
            />
          )}
          {selectedPainType && (
            <ActiveFilterTag
              label={selectedPainType}
              onRemove={() => onPainTypeChange(null)}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

// ========================
// FILTER BUTTON SUB-COMPONENT
// ========================

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium',
        'border transition-all duration-200',
        isActive
          ? [
              'bg-accent/10 text-accent',
              'border-accent/50',
              'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
            ]
          : [
              'bg-white/5 text-text-secondary',
              'border-white/10',
              'hover:bg-white/10 hover:text-text-primary hover:border-white/20',
            ]
      )}
    >
      {label}
    </motion.button>
  );
}

// ========================
// ACTIVE FILTER TAG SUB-COMPONENT
// ========================

interface ActiveFilterTagProps {
  label: string;
  onRemove: () => void;
}

function ActiveFilterTag({ label, onRemove }: ActiveFilterTagProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
        'bg-accent/20 text-accent text-sm',
        'border border-accent/30'
      )}
    >
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:text-accent-light transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

export default FilterBar;
