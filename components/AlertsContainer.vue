<template>
  <div id="alertsContainer">
    <v-alert
      v-for="alert in alerts"
      :key="alert.id"
      :value="alert.visible"
      :icon="alert.icon"
      :type="alert.type"
      dismissible
      transition="slide-x-transition"
    >{{ alert.message }}</v-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export type Alert = {
    message: string,
    type?: 'success' | 'info' | 'warning' | 'error',
    timeout?: number,
    icon?: string,
    visible?: boolean,
    id?: string
}

@Component
export default class AlertsContainer extends Vue {
    alerts: Alert[] = []

    addAlert(alert: Alert) {
        alert = {
            message: alert.message,
            type: alert.type || 'success',
            timeout: alert.timeout || 8000,
            icon: alert.icon,
            visible: true,
            id: this.createUniqueId()
        }

        this.alerts.push(alert)
        this.setAlertHideTimeout(alert)
    }

    private createUniqueId(): string {
      return Math.random().toString(36).substr(2, 9)
    }

    private setAlertHideTimeout(alert: Alert) {
      setTimeout(() => {
        alert.visible = false;
      }, alert.timeout);

      setTimeout(() => {
        let index = this.alerts.findIndex(item => item.id === alert.id);
        if (index + 1) {
          this.alerts.splice(index, 1);
        }
      }, (alert.timeout || 8000) + 3000);
    }
}
</script>

<style lang="scss">
#alertsContainer {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10;
}
</style>
