<script lang="ts">
  export let current: number, total: number;
</script>

<div class="progress-bar">
  <div class="progress-bar__bar" style="width: {(current / total) * 100}%" />
</div>

<style>
  .progress-bar {
    position: relative;
    height: 1rem;
    background-color: #e9ecef;
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .progress-bar__bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #007bff;
    transition: width 0.6s ease;
  }
</style>
