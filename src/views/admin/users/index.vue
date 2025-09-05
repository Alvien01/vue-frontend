<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { useUsers } from '../../../composables/user/useUser'
import { useUserDelete } from '../../../composables/user/useUserDelete'

const queryClient = useQueryClient()
const { data: users, isLoading, isError, error } = useUsers()
const { mutate, isPending } = useUserDelete()

const handleDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
      },
    })
  }
}
</script>

<template>
  <div class="container-fluid mt-5 mb-5">
    <div class="card border-0 rounded-4 shadow-sm">
      <div
        class="card-header d-flex justify-content-between align-items-center"
      >
        <h5 class="mb-0">List User</h5>
        <router-link
          to="/admin/users/create"
          class="btn btn-sm btn-success rounded-4 shadow-sm border-0"
        >
          ADD USER
        </router-link>
      </div>
      <div class="card-body">
        <div v-if="isLoading" class="alert alert-info text-center">
          Loading...
        </div>

        <div v-if="isError" class="alert alert-danger text-center">
          Error: {{ error?.message }}
        </div>

        <div class="table-responsive">
          <table
            v-if="users"
            class="table table-hover align-middle table-striped mb-0"
          >
            <thead class="table-dark">
              <tr>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email Address</th>
                <th class="text-center" style="width: 20%">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td class="text-center">
                  <router-link
                    :to="`/admin/users/edit/${user.id}`"
                    class="btn btn-sm btn-primary rounded-4 shadow-sm border-0 me-2"
                  >
                    EDIT
                  </router-link>
                  <button
                    @click="handleDelete(user.id)"
                    :disabled="isPending"
                    class="btn btn-sm btn-danger rounded-4 shadow-sm border-0"
                  >
                    {{ isPending ? 'DELETING...' : 'DELETE' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
