<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <CTable />
      </div>
      <div class="col-9">
        <CCalendar />
      </div>
    </div>
  </div>
</template>

<script>
import CTable from '@/components/CTable'
import CCalendar from '@/components/CCalendar'
export default {
  name: 'Index',
  components: { CTable, CCalendar},
}
</script>
