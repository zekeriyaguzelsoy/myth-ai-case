<template>
  <div v-if="job" class="space-y-6">
    <!-- Geri Dön Butonu -->
    <div>
      <button
        @click="$router.go(-1)"
        class="flex items-center text-primary-600 hover:text-primary-700 font-medium"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Geri Dön
      </button>
    </div>

    <!-- İş İlanı Detayları -->
    <div class="card">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ job.title }}
          </h1>
          <p class="text-xl text-gray-600 mb-4">{{ job.company }}</p>
        </div>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
          {{ job.category }}
        </span>
      </div>

      <!-- İş Bilgileri -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="space-y-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">{{ job.location }}</span>
          </div>
          
          <div class="flex items-center">
            <svg class="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">{{ formatDate(job.postedAt) }}</span>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">{{ job.salary }}</span>
          </div>
        </div>
      </div>

      <!-- Açıklama -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">İş Açıklaması</h3>
        <p class="text-gray-700 leading-relaxed">{{ job.description }}</p>
      </div>

      <!-- Gereksinimler -->
      <div v-if="job.requirements && job.requirements.length > 0">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Gereksinimler</h3>
        <ul class="space-y-2">
          <li
            v-for="requirement in job.requirements"
            :key="requirement"
            class="flex items-start"
          >
            <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-700">{{ requirement }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Başvuru Butonu -->
    <div class="card">
      <div class="text-center">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Bu İşe Başvurmak İster misiniz?</h3>
        <button class="btn-primary text-lg px-8 py-3">
          Başvuru Yap
        </button>
      </div>
    </div>
  </div>

  <!-- Yükleniyor Durumu -->
  <div v-else class="flex justify-center items-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useJobStore } from '../stores/jobStore'

const route = useRoute()
const jobStore = useJobStore()

const job = computed(() => {
  return jobStore.getJobById(route.params.id)
})

onMounted(() => {
  if (jobStore.jobs.length === 0) {
    jobStore.fetchJobs()
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script> 