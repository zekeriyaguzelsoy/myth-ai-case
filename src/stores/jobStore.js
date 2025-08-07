import { defineStore } from 'pinia'
import jobsData from '../data/jobs.json'

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    filteredJobs: [],
    filters: {
      search: '',
      location: '',
      category: ''
    },
    categories: ['Development', 'Design', 'Marketing', 'Sales', 'Support']
  }),

  getters: {
    getJobById: (state) => (id) => {
      return state.jobs.find(job => job.id === parseInt(id))
    }
  },

  actions: {
    async fetchJobs() {
      // Gerçek uygulamada API'den veri çekilir
      this.jobs = jobsData
      this.filteredJobs = [...this.jobs]
    },

    applyFilters() {
      let filtered = [...this.jobs]

      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase()
        filtered = filtered.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        )
      }

      if (this.filters.location) {
        filtered = filtered.filter(job => 
          job.location.toLowerCase().includes(this.filters.location.toLowerCase())
        )
      }

      if (this.filters.category) {
        filtered = filtered.filter(job => 
          job.category === this.filters.category
        )
      }

      this.filteredJobs = filtered
    },

    clearFilters() {
      this.filters = {
        search: '',
        location: '',
        category: ''
      }
      this.filteredJobs = [...this.jobs]
    }
  }
}) 