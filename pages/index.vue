<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <CTable />
      </div>
      <div class="col-9">
        <CalendarView />
      </div>
    </div>
  </div>
</template>

<script>
import CTable from '@/components/CTable'
import CalendarView from '@/components/CalendarView'
export default {
  name: 'IndexPage',
  components: { CTable, CalendarView},
}
</script>
