import { dummySearchItems } from '@/constants/data'
import { useCallback, useMemo, useState } from 'react'

export type FilterType = "All" | "Burgers" | "Pizza" | "Fries" | "Drinks"

export const useSearch = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Memoized filtered and searched items
  const filteredItems = useMemo(() => {
    let items = dummySearchItems

    // Filter by category
    if (selectedFilter !== "All") {
      items = items.filter(item => 
        item.category?.toLowerCase().includes(selectedFilter.toLowerCase())
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query)
      )
    }

    return items
  }, [selectedFilter, searchQuery])

  const handleFilterChange = useCallback((filter: FilterType) => {
    setSelectedFilter(filter)
  }, [])

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text)
  }, [])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  const resetFilters = useCallback(() => {
    setSelectedFilter("All")
    setSearchQuery("")
  }, [])

  return {
    selectedFilter,
    searchQuery,
    filteredItems,
    handleFilterChange,
    handleSearchChange,
    clearSearch,
    resetFilters,
    hasActiveFilters: selectedFilter !== "All" || searchQuery.trim().length > 0
  }
} 