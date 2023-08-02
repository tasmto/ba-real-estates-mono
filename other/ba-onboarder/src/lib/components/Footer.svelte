<script lang="ts">
  import { t } from '$lib/translations';
</script>

<footer>
  © {new Date().getFullYear()}
  {$t('common.titleSeparator')}
  <a href={$t('common.siteUrl')} target="_blank" rel="noreferrer">{$t('common.siteName')}</a>
</footer>

<style>
  footer {
    background: var(--card-background-color);
    border-top: 1px solid var(--muted-border-color);
    font-size: 0.75em;
    text-align: center;
    padding: 1em;
  }
</style>
