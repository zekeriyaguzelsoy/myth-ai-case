<template>
  <div class="space-y-6">
    <!-- Filtre Bölümü -->
    <div class="card">
      <h2 class="text-lg font-semibold mb-4">Filtreler</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Arama
          </label>
          <input
            v-model="jobStore.filters.search"
            type="text"
            placeholder="İş başlığı, şirket veya anahtar kelime..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            @input="jobStore.applyFilters"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Lokasyon
          </label>
          <input
            v-model="jobStore.filters.location"
            type="text"
            placeholder="Şehir, eyalet..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            @input="jobStore.applyFilters"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            v-model="jobStore.filters.category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            @change="jobStore.applyFilters"
          >
            <option value="">Tüm Kategoriler</option>
            <option v-for="category in jobStore.categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="mt-4">
        <button
          @click="jobStore.clearFilters"
          class="btn-primary"
        >
          Filtreleri Temizle
        </button>
      </div>
    </div>

    <!-- Sonuç Sayısı -->
    <div class="flex justify-between items-center">
      <p class="text-gray-600">
        {{ jobStore.filteredJobs.length }} iş ilanı bulundu
      </p>
    </div>

    <!-- İş İlanları Listesi -->
    <div class="grid gap-6">
      <div
        v-for="job in jobStore.filteredJobs"
        :key="job.id"
        class="card cursor-pointer hover:shadow-lg transition-shadow duration-200"
        @click="goToJobDetail(job.id)"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ job.title }}
            </h3>
            <p class="text-gray-600 mb-2">{{ job.company }}</p>
            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                {{ job.location }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                {{ formatDate(job.postedAt) }}
              </span>
            </div>
            <p class="text-gray-700 line-clamp-2">{{ job.description }}</p>
          </div>
          
          <div class="ml-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {{ job.category }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Boş Durum -->
    <div v-if="jobStore.filteredJobs.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">İş ilanı bulunamadı</h3>
      <p class="mt-1 text-sm text-gray-500">
        Filtrelerinizi değiştirerek tekrar deneyin.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '../stores/jobStore'

const router = useRouter()
const jobStore = useJobStore()

onMounted(() => {
  jobStore.fetchJobs()
})

const goToJobDetail = (jobId) => {
  router.push(`/job/${jobId}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script> 